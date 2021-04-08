---2020-11-04---

### ELK 설치

**엘라스틱서치**

1. 해당 홈페이지에서 elastic, logstash, kibana 다운 후 압축 풀기 (모두 oss)

   https://www.elastic.co/kr/downloads/past-releases#elasticsearch

2. 엘라스틱서치 설정하기 : **메뉴얼 참고**

   **discovery.zen.ping.unicast.hosts: ["search02", "search03"]  **

   ~~**discovery.seed_hosts: ["search02", "search03"]**~~=> 버전 업그레이드 되면서 바뀜

   => discovery.seed_hosts: ["0.0.0.0"]

3. 실행방법 

   - C:\ELK\elasticsearch-oss-7.2.0-windows-x86_64\elasticsearch-7.2.0\bin 에서 elasticsearch.bat 파일 실행 후 http://localhost:9200/ 접속

   - 백그라운드 실행 > ./bin/elasticsearch-d -p .pid
   - 종료 > kill ....



**로그스테시**

**logstash 실행**

logstash -f C:\ELK\logstash-oss-7.2.0\logstash-7.2.0\config\sample.conf



1. 로그스테시 config 파일 생성하기

   > C:\ELK\logstash-oss-7.2.0\logstash-7.2.0\config

   해당 폴더에 .conf 파일 생성  이 때 **input.file.path에 경로 '/'로 사용**!!

   sincedb_path => "null"        

2. 로그스테시 실행하기

   > logstash -f [conf 파일 경로\파일 이름]

3. kibana가서 확인하기



**키바나**

엘라스틱서치 실행 후 키바나 실행

- C:\ELK\kibana-oss-7.2.0-windows-x86_64\kibana-7.2.0-windows-x86_64\bin 에서 kibana.bat 파일 실행 후 http://localhost:5601/ 접속





#### 플러그인 설치

1. 그룹웨어 자료실에서 플러그인 3가지 다운 후 압축 풀기

**자동완성**

**형태소분석기(KoBrick)** -> 라이센스 적용해야함

**Management Console**



=> 매뉴얼 참고 !!





---2020-11-05----

📚 to do list

0. management console 설치 및 설정 ✔

1. kibana 설치 ✔
2. template 만들어보기 ✔
3. index 만들어보기 ✔
4. index에 데이터 넣어보기 ✔
5. index 검색해보기 



**데이터를 색인 하는 방법**

1. 로그스태쉬 ✔
2.  NiFi 
3. 직접 코드짜서 색인하기 ✔



**관리자 콘솔**

- openQuery SE 의 Management Console 패키지 파일 다운 후 압축해제

- management console 설정
  - elasticsearch 설정 : config/elasticsearch.json
  - 관리콘솔 설정 : config/console.json 
    - 로깅레벨을 debug 로 설정하는 경우에는 다량의 로그가 기록될 수 있습니다 . 오류
      확인인 필요한 경우에만 debug 로 변경하고 확인 후에는 info 로 변경해야 합니다
  - 게이트웨이(gateway) 설정: config/gateway.json
- management console 실행 및 중지
  - (node:17432) Warning: Accessing non-existent property 'cat' of module exports inside circular dependency
    (Use `node --trace-warnings ...` to show where the warning was created) ...... =>워닝 뜸... property 추가방법은????????



#### 데이터 색인 하기

`mapping`을 미리 지정할 수 있는데 이 기능이 바로 `template` 이다.

1. template 만들어보기 -> mapping
2. 데이터 색인
   1. logstash 사용하여 .csv 파일을 이용하여 색인
   2. 키바나 콘솔에서 직접 색인하기
   3. nifi



---2020.11.06----

#### index 검색하기

- **must** 키워드 => AND
- **should** 키워드 => OR



ex)

GET temp02/_search?pretty
{
  "query":{
    "bool": {
      "must": [
        {
          "query_string": {
            "fields": ["EDT_KEYWORD_LINE01", "EDT_KEYWORD_LINE02"],
            "query": "껍질"
          }
        },
        {
          "query_string": {
            "fields": ["TITLE"],
            "query": "교양"
          }
        }
        

      ],
      "should": [
        {
          "query_string": {
            "fields": ["EDT_TXT_LINE01.korean"],
            "query": "매력속으로"
          }
        }
      ]
    }
  },
  "_source": ["TITLE","VIDEO_ID"]	# 해당 필드만 출력
}







2020-11-09

1. nifi 교육
2. node js



**nifi**



![image-20201109175103687](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20201109175103687.png)



**cluster  상태값이 yellow인 경우**

cluster 상태값이 yellow면 replica 할당하지 못한 상태가 됩니다.

 

선행작업으로 

 

GET _cat/shards 명령어를 통해서 shard 값을 확인 할 수 있으며, yellow가 된 인덱스를 확인해보면 replica 부분에 unssigned 로 되어있는 것을 확인 할 수 있을 겁니다.

 

unassigned shard 문제는 여러가지 상황에 따라 발생을 할 수가 있습니다.

 

첫번째 - node 간 데이터를 옮기는 과정이기 때문에 네트워크 구간에서 발생 할 수 있는 여러가지 문제들이 영향을 줄 수 있습니다. 

두번째 - 색인 데이터 recovery 가 실패 하고 깨졌을 때도 발생 합니다.

세번째 - watermark 설정으로 인해서 발생할 수 있음

 

그외 여러가지 이유로 발생할 수 있습니다.

 

위를 해결하기 위해서는 보통 리부팅을 통해서 해결이 되고, reroute 하는 방법도 존재하나 아직 reroute를 해본 사례가 없으며 reroute 방법은인터넷 검색을 통해서 해결 하면 될 것 같습니다.

 

크레텍의 경우는 watermark 설정에 의해 이러한 문제가 발생했었으며, 아래와 같은 방식으로 해결을 했습니다.

 

권장) low watermark 의 설정 값은 보통 할당용량의 85% high watermark 90%로 설정을 합니다.

 

방법1) 

PUT _cluster/settings

{

 "transient": {

  "cluster": {

   "routing": {

​    "allocation": {

​     "disk": {

​      "watermark": {

​       "low": "15gb",

​       "flood_stage": "5gb",

​       "high": "5gb"

​      }

​     }

​    }

   }

  }

 }

}

 

 

방법2) 

 

\# /etc/elasticsearch/elasticsearch.yml

cluster.routing.allocation.disk.threshold_enabled: true

cluster.routing.allocation.disk.watermark.flood_stage: 5gb

cluster.routing.allocation.disk.watermark.low: 15gb

cluster.routing.allocation.disk.watermark.high: 5gb

 

 

참고) https://www.elastic.co/guide/en/elasticsearch/reference/current/disk-allocator.html

