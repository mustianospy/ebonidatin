"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MoreVertical, Shield, ShieldOff, Ban, Trash2 } from "lucide-react"
import { toast } from "sonner"

interface AdminUserActionsProps {
  userId: string
  isAdmin: boolean
}

export function AdminUserActions({ userId, isAdmin }: AdminUserActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const toggleAdminStatus = async () => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("profiles").update({ is_admin: !isAdmin }).eq("id", userId)

      if (error) throw error

      // Log admin action
      await supabase.rpc("log_admin_action", {
        p_action: isAdmin ? "removed_admin" : "granted_admin",
        p_target_user_id: userId,
      })

      toast.success(isAdmin ? "Admin privileges removed" : "Admin privileges granted")
      router.refresh()
    } catch (error) {
      toast.error("Failed to update admin status")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteUser = async () => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("profiles").delete().eq("id", userId)

      if (error) throw error

      // Log admin action
      await supabase.rpc("log_admin_action", {
        p_action: "deleted_user",
        p_target_user_id: userId,
      })

      toast.success("User deleted successfully")
      router.refresh()
    } catch (error) {
      toast.error("Failed to delete user")
      console.error(error)
    } finally {
      setIsLoading(false)
      setShowDeleteDialog(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" disabled={isLoading}>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={toggleAdminStatus}>
            {isAdmin ? (
              <>
                <ShieldOff className="h-4 w-4 mr-2" />
                Remove Admin
              </>
            ) : (
              <>
                <Shield className="h-4 w-4 mr-2" />
                Make Admin
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Ban className="h-4 w-4 mr-2" />
            Suspend Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-red-600">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteUser} className="bg-red-600 hover:bg-red-700">
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
