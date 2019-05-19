# #!/bin/sh
# str="'$*'"
# echo "$str"
#!/bin/bash
str="'$*'"
git add .
git commit -a -m "$str"
git push