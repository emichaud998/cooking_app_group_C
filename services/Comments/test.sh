#!/bin/bash

# set -ex
start=$(($(date +%s%N)/1000000))
for i in {1..500}; do
  curl --silent --output /dev/null \
  --location --request POST 'http://localhost:9020/api/comments/create_comment' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "userId": "a",
      "postId": "b",
      "commentText": "good job"
  }' &
done
wait
end=$(($(date +%s%N)/1000000))
time=$((end-start))
echo "finished in $time ms"
