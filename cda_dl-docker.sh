file=$(mktemp temp.XXXXXXXXX)
lynx -dump -listonly --nonumbers $1 | grep video/ | sed '$!N; /^\(.*\)\n\1$/!P; D' >> $file
xargs -n 1 -I{} sh bridge.sh {} <$file
rm -r $file
