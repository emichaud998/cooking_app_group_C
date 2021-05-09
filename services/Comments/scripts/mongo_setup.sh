#!/bin/bash
sleep 10

echo SETUP.sh time now: `date +"%T" `
mongo --host mongo1:27017 <<EOF
  var cfg = {
    "_id": "comment_replica",
    "version": 1,
    "members": [
      {
        "_id": 0,
        "host": "mongo1:27017",
        "priority": 1
      },
      {
        "_id": 1,
        "host": "mongo2:27017",
        "priority": 0.5
      },
      {
        "_id": 2,
        "host": "mongo3:27017",
        "priority": 0.5
      },
      {
        "_id": 3,
        "host": "mongo4:27017",
        "priority": 0.5
      },
      {
        "_id": 4,
        "host": "mongo5:27017",
        "priority": 0.5
      },
    ]
  };
  rs.initiate(cfg, { force: true });
  rs.reconfig(cfg, { force: true });
  db.getMongo().setReadPref('nearest');
  db.getMongo().setSecondaryOk();