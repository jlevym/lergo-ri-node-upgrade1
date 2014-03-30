






#!/bin/sh
### BEGIN INIT INFO
# Provides:          cwpm
# Required-Start:    $local_fs $network $named $time $syslog
# Required-Stop:     $local_fs $network $named $time $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Description:       A pool manager for cloudify widget
### END INIT INFO

SYSCONFIG=/etc/sysconfig/lergo
source $SYSCONFIG
INSTALL_LOCATION=/var/www/lergo/lergo-ri

SERVICE_NAME=lergo

PIDFILE=/var/run/$SERVICE_NAME.pid
LOGFILE=/var/log/$SERVICE_NAME.log

SCRIPT=$INSTALL_LOCATION/start.sh
RUNAS=root


start() {
    echo "pidname is [$PIDNAME]"
  if [ -f /var/run/$PIDNAME ] && kill -0 $(cat /var/run/$PIDNAME); then
    echo 'Service already running' >&2
    return 1
  fi
  echo 'Starting service...' >&2
  local CMD="$SCRIPT &> \"$LOGFILE\" & echo \$!"
  su -c "$CMD" $RUNAS > "$PIDFILE"
  echo 'Service started' >&2
}

stop() {
  if [ ! -f "$PIDFILE" ] || ! kill -0 $(cat "$PIDFILE"); then
    echo 'Service not running' >&2
    return 1
  fi
  echo 'Stopping service…' >&2
  kill -15 $(cat "$PIDFILE") && rm -f "$PIDFILE"
  echo 'Service stopped' >&2
}

status(){

    PROCFILE=/proc/`cat $PIDFILE`
    if [ -e $PROCFILE ]; then
        echo "service is running"
        return 0
    else
        echo "service is stopped"
        return 0
    fi
}

upgrade(){
    $INSTALL_LOCATION/build/upgrade.sh
}


case "$1" in
  start)
    start
    ;;
  stop)
    stop
    ;;
  upgrade)
    upgrade
    ;;
  status)
    status
    ;;
  retart)
    stop
    start
    ;;
  *)
    echo "Usage: $0 {start|stop|restart}"
esac

