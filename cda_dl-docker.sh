file=$(mktemp temp.XXXXXXXXX)
lynx -dump -listonly --nonumbers $1 | grep video/ | sed '$!N; /^\(.*\)\n\1$/!P; D' | sort | uniq >> $file
xargs -n 1 -I{} sh bridge.sh {} <$file
aria2c -i lista.txt -d Pobrane --auto-file-renaming=false -c -j 10 -x 3 -s 3 -k 1M
rm -r lista.txt
rm -r $file