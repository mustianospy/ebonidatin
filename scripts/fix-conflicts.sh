#!/bin/bash
# ===========================================================
# fix-conflicts.sh
# Automatically remove leftover Git merge conflict markers
# ===========================================================

echo "🧹 Cleaning up unresolved Git merge conflict markers..."

# Find all files with conflict markers
conflicted_files=$(grep -rl '<<<<<<<\|=======\|>>>>>>>' --include="*.ts" --include="*.tsx" .)

if [ -z "$conflicted_files" ]; then
  echo "✅ No conflict markers found!"
  exit 0
fi

# Create backup folder
mkdir -p .merge_backups

# Loop through each file and remove conflict markers
for file in $conflicted_files; do
  echo "Fixing: $file"
  cp "$file" ".merge_backups/$(basename "$file")"

  # Remove Git conflict markers
  cat "$file" | sed '/^<<<<<<< /d;/^=======/d;/^>>>>>>> /d' > "$file.tmp" && mv "$file.tmp" "$file"
done

echo "✅ Conflict markers removed from all .ts and .tsx files!"
echo "📦 Backups saved in .merge_backups/"
echo "💡 Review changes before committing."

# Optional: auto add and commit
read -p "Commit changes now? (y/n): " confirm
if [ "$confirm" = "y" ]; then
  git add .
  git commit -m "chore: auto-resolved merge conflict markers"
  echo "✅ Commit created. You can now push to origin/main."
fi
