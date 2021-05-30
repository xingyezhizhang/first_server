# first_server
网盘链接管理服务器，第一次尝试


### 日志处理
```bash
# 删除日志 30天的
find /opt/soft/log/ -mtime +30 -name "*.log" -exec rm -rf {} \;

# 分别指定任务的脚本，任务读取文件路径，任务日志输出
#vim kettle.sh
/usr/etc/tools/pendaho/data-integration/kitchen.sh -file=/usr/etc/tools/pendaho/kettle/works.kjb -level=Detailed -logfile=/usr/etc/tools/pendaho/kettle/logs/kettle.log

# 拆分日志
#vim kettle_log.sh
 1 #!/bin/bash
 2 #function:kitchen.sh日志分割，最多保留? 4  
 5 dir=/usr/etc/tools/pendaho/kettle/logs/;
 6 file=kettle.log;
 7 #DATE=`date +"%Y%m%d %H%M%S"`;
 8 #date_file=$file-`date +"%Y%m%d-%H%M%S"`; #kettle.log-20190723
 9 date_file=$file-`date -d "1 minutes ago" +%Y%m%d-%H:%M:%S`; #实际上是1分钟前的所以增加1m ago;可以在命令行调试date -d;
10 #echo $date_file
11 #归档日志-将$file修改为$date_file,而后创建$file
12 cd $dir && mv -f $file $date_file && touch $file;
13  
14 #删除2天前的归档日志
15 #find $dir -mtime +3 -name "$file-*.log" -exec rm -rf {} \;
16 #find $dir -mtime +3 -name "kettle.log*" -exec rm -rf {} \;
17 find $dir -cmin +3 -name "kettle.log*" -exec rm -rf {} \;
```


