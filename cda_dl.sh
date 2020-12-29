file=$(mktemp temp.XXXXXXXXX)
mkdir -p Pobrane
lynx -dump -listonly --nonumbers $1 | grep video/ | sed '$!N; /^\(.*\)\n\1$/!P; D' >> $file
xargs -n 1 -I{} sh bridge.sh {} <$file
aria2c -i lista.txt
mv *.mp4 Pobrane
rm -r $file