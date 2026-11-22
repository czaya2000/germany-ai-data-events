# Prepare run report

- Date: 2026-11-22 (window 120 days), mode: daily
- Feed sources: 219/219 reachable (100%), 6 disabled
- Totals: fetched 2250, in-window German 1129, after keyword filter 606, after dedupe 366, known 363, new 3, sent to Claude 3, deferred by cap 0
- Ledger: 1055 entries, 0 pruned

## Per source (feed)

Columns: fetched = items parsed and normalised; in-window DE = passed country, window, cancelled and duration checks; kept = also passed the keyword filter; dedupe = clusters the source took part in; primary = clusters whose best record came from this source.

| source | trust | fetched | in-window DE | kept | dedupe | primary | errors | ms | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agentconfs | curated | 544 | 12 | 12 | 12 | 7 | 0 | 274 | ok |
| brainberg | noisy | 319 | 250 | 102 | 99 | 14 | 0 | 4145 | ok |
| hackevents-ai | noisy | 230 | 207 | 176 | 172 | 104 | 0 | 650 | ok |
| aieventlist-europe | curated | 172 | 22 | 22 | 22 | 10 | 0 | 1093 | ok |
| confstech | noisy | 138 | 2 | 0 | 0 | 0 | 0 | 1098 | ok |
| hackevents-data | noisy | 58 | 50 | 44 | 44 | 8 | 0 | 585 | ok |
| luma-berlin | noisy | 53 | 53 | 6 | 6 | 6 | 0 | 1051 | ok |
| deutschlandki | curated | 50 | 18 | 18 | 18 | 18 | 0 | 529 | ok |
| bwcon | noisy | 25 | 17 | 7 | 7 | 6 | 0 | 865 | ok |
| luma-munich | noisy | 21 | 21 | 4 | 4 | 4 | 0 | 1206 | ok |
| luma-hamburg | noisy | 21 | 21 | 4 | 4 | 3 | 0 | 2000 | ok |
| lmu | noisy | 20 | 15 | 0 | 0 | 0 | 0 | 1077 | ok |
| devevents | noisy | 20 | 4 | 1 | 1 | 1 | 0 | 295 | ok |
| aieventlist-berlin | curated | 15 | 6 | 6 | 6 | 3 | 0 | 1639 | ok |
| aieventlist-munich | curated | 12 | 11 | 11 | 11 | 9 | 0 | 2133 | ok |
| luma-frankfurt | noisy | 11 | 11 | 2 | 2 | 1 | 0 | 2354 | ok |
| meetup:ai-beavers | noisy | 10 | 10 | 10 | 10 | 10 | 0 | 8006 | ok |
| caiml | curated | 10 | 0 | 0 | 0 | 0 | 0 | 874 | ok |
| meetup:jug-bb | noisy | 10 | 5 | 0 | 0 | 0 | 0 | 4190 | ok |
| meetup:silicon-allee-events | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8100 | ok |
| meetup:stuttgart-industrie-4-0-und-iot-meetup | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 8189 | ok |
| meetup:heidelberg-makers-meetup | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8108 | ok |
| meetup:game-developers-berlin | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8190 | ok |
| meetup:unternehmer-startups-meetup-rosenheim | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8134 | ok |
| meetup:uxchange | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8080 | ok |
| meetup:rosenheim-bitcoin-stammtisch | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8152 | ok |
| meetup:java-user-group-hannover | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 8041 | ok |
| meetup:leipzig-wordpress-meetup | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 7983 | ok |
| meetup:bitcoinkarlsruhe | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8127 | ok |
| meetup:softwerkskammer-luebeck | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8071 | ok |
| meetup:kubernetes-meetup-bielefeld | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8167 | ok |
| meetup:wpmeetup-stuttgart | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8123 | ok |
| meetup:chiemseebitcoinandblockchainmeetup | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 7808 | ok |
| meetup:gamedevmuc | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8129 | ok |
| meetup:berlin-wordpress-meetup | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8168 | ok |
| meetup:makercube | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 7856 | ok |
| meetup:rust-berlin | noisy | 10 | 9 | 8 | 8 | 8 | 0 | 8192 | ok |
| meetup:aibuildersclub | noisy | 10 | 10 | 10 | 9 | 9 | 0 | 8310 | ok |
| meetup:leipzig-python-user-group | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 7888 | ok |
| meetup:pycologne | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 8104 | ok |
| meetup:freifunk-oberhausen | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8088 | ok |
| meetup:betreute-intelligenz | curated | 9 | 5 | 5 | 5 | 5 | 0 | 8190 | ok |
| meetup:muenster-macht-agil | noisy | 8 | 8 | 0 | 0 | 0 | 0 | 8164 | ok |
| meetup:decentralized-trust-ruhrgebiet | noisy | 8 | 8 | 3 | 3 | 3 | 0 | 8257 | ok |
| meetup:pirateskills | curated | 7 | 4 | 4 | 4 | 4 | 0 | 8166 | ok |
| hessian-ai | curated | 7 | 7 | 6 | 6 | 6 | 0 | 1308 | ok |
| meetup:ibm-developers | noisy | 7 | 7 | 7 | 2 | 0 | 0 | 8143 | ok |
| meetup:munchen-ai-machine-learning-and-computer-vision-meetup | curated | 6 | 6 | 5 | 5 | 5 | 0 | 4470 | ok |
| meetup:bliss-speaker-series | curated | 6 | 6 | 6 | 6 | 6 | 0 | 8100 | ok |
| mcml | curated | 6 | 6 | 4 | 4 | 4 | 0 | 695 | ok |
| gfw-warendorf | curated | 6 | 6 | 4 | 4 | 4 | 0 | 1370 | ok |
| meetup:berlin-software-engineering-leadership-meetup-group | noisy | 6 | 6 | 0 | 0 | 0 | 0 | 8147 | ok |
| aieventlist-frankfurt | curated | 5 | 2 | 2 | 2 | 1 | 0 | 2966 | ok |
| meetup:startup-factory-boost-network | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 8110 | ok |
| meetup:spawnpoint | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 7936 | ok |
| meetup:ai-nights-nurnberg | curated | 4 | 4 | 4 | 4 | 4 | 0 | 8170 | ok |
| meetup:hannover-unity-meetup | noisy | 4 | 4 | 0 | 0 | 0 | 0 | 8073 | ok |
| meetup:liberating-structures-user-group-rhein-main | noisy | 4 | 2 | 0 | 0 | 0 | 0 | 8098 | ok |
| meetup:code-for-munster | noisy | 4 | 4 | 0 | 0 | 0 | 0 | 8051 | ok |
| meetup:maikers-ai-community | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8001 | ok |
| aieventlist-hamburg | curated | 3 | 2 | 2 | 2 | 1 | 0 | 3894 | ok |
| meetup:digital-craftsmanship-nordoberpfalz | noisy | 3 | 2 | 2 | 2 | 2 | 0 | 7849 | ok |
| meetup:berlindroid | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8021 | ok |
| meetup:hannover-python-meetup | noisy | 3 | 3 | 3 | 3 | 3 | 0 | 8046 | ok |
| meetup:gdg-nuremberg | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8006 | ok |
| meetup:gamedevtreff-ruhrpott | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 7926 | ok |
| meetup:it-security-kassel | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8089 | ok |
| meetup:pydata-berlin | curated | 2 | 2 | 2 | 2 | 2 | 0 | 331 | ok |
| meetup:pydata-hamburg | curated | 2 | 2 | 2 | 2 | 1 | 0 | 1181 | ok |
| meetup:ibmpoweraiberlin | curated | 2 | 2 | 2 | 2 | 2 | 0 | 5206 | ok |
| meetup:ai-agenten-frankfurt | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8036 | ok |
| aieventlist-cologne | curated | 2 | 2 | 2 | 2 | 1 | 0 | 4709 | ok |
| meetup:big-data-developers-in-berlin | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 7542 | ok |
| meetup:ibmpoweraifrankfurt | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 7877 | ok |
| meetup:big-data-developers-in-munich | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 7955 | ok |
| meetup:ibm-powerai-dusseldorf | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8022 | ok |
| meetup:jug-hamburg | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7706 | ok |
| meetup:main-valley | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 7834 | ok |
| meetup:berlinbanktechnights | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 7956 | ok |
| meetup:frontend-meetup-freiburg | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 7957 | ok |
| meetup:opentechschool-leipzig | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8044 | ok |
| meetup:rewe-digital-events-cologne | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8049 | ok |
| meetup:godot-stammtisch-karlsruhe | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7936 | ok |
| meetup:azure-serverless-koln | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8037 | ok |
| meetup:the-test-tribe-frankfurt-meetup | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8044 | ok |
| meetup:ksug-in | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 7996 | ok |
| meetup:rethinking-ai-at-work | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 7774 | ok |
| meetup:cologne-js | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7942 | ok |
| meetup:ai-professionals-munich | curated | 1 | 1 | 1 | 1 | 0 | 0 | 2189 | ok |
| meetup:munich-datageeks | curated | 1 | 1 | 1 | 1 | 1 | 0 | 3185 | ok |
| meetup:hamburg-data-science-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8044 | ok |
| meetup:clickhouse-meetup-munich | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8040 | ok |
| meetup:berlinai | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7952 | ok |
| meetup:ai-agents-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7941 | ok |
| meetup:agentic-ai-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7825 | ok |
| meetup:sovereign-ai-meetup-ulm | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7836 | ok |
| meetup:bonner-ki-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8008 | ok |
| meetup:ai-school-leipzig | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7977 | ok |
| meetup:ai-cloud-innovation-karlsruhe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8007 | ok |
| meetup:kassel-data-science-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8023 | ok |
| meetup:artificial-intelligence-meetup-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7983 | ok |
| meetup:heidelberg-knowledge-graph-ai-hub | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8002 | ok |
| meetup:munich-snowflake-data-cloud-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8004 | ok |
| meetup:beads-berlin-ecosystem-for-analytics-and-data-systems | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8079 | ok |
| meetup:pass-microsoft-data-platform-usergroup-rheinland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7866 | ok |
| meetup:awsughh | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8014 | ok |
| meetup:fra_aws | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8015 | ok |
| meetup:prompting-lab | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8043 | ok |
| aieventlist-stuttgart | curated | 1 | 1 | 1 | 1 | 1 | 0 | 5214 | ok |
| meetup:pydata-munchen | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 386 | ok |
| meetup:grafana-friends-frankfurt | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 1142 | ok |
| meetup:producttank-nuernberg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 2110 | ok |
| meetup:tech-talk-stuttgart | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 2757 | ok |
| meetup:owasp-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 4677 | ok |
| meetup:wtm-berlin | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 5019 | ok |
| meetup:producttank-munich | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 5753 | ok |
| meetup:azure-dusseldorf-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 5869 | ok |
| meetup:openmates-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6745 | ok |
| meetup:inovex-meetup-erlangen | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7039 | ok |
| meetup:cybercologne-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7998 | ok |
| meetup:azure-bonn-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7913 | ok |
| meetup:gdg-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7913 | ok |
| meetup:net-user-group-karlsruhe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7979 | ok |
| meetup:isaqb-software-architektur-meetup-gruppe-fur-interessierte | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8066 | ok |
| meetup:django-cologne | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7910 | ok |
| meetup:mannheim-java-usergroup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8023 | ok |
| meetup:pass-usergroup-rhein-main | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7974 | ok |
| meetup:give-a-go | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7805 | ok |
| meetup:checkmk-munich-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8030 | ok |
| meetup:devtalk-tk | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7888 | ok |
| meetup:womentechmakershamburg | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8047 | ok |
| meetup:meetup-group-pnulfhzz | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8024 | ok |
| meetup:prodot-insights | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8009 | ok |
| meetup:padagility | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7952 | ok |
| meetup:cloud-native-munster | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8096 | ok |
| meetup:meetup-group-igafblfy | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7973 | ok |
| meetup:meetup-group-tfyvuydp | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7979 | ok |
| meetup:cloud-native-night | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7981 | ok |
| meetup:leipzig-golang | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7996 | ok |
| meetup:nordic-coding | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8002 | ok |
| meetup:node-code-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8026 | ok |
| meetup:rust-dortmund | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7925 | ok |
| meetup:jug-nurnberg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7990 | ok |
| meetup:le-software-craft-community | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7979 | ok |
| meetup:tech-talk-muenster | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7997 | ok |
| meetup:opensource-ruhr | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7959 | ok |
| meetup:scrum-user-group-karlsruhe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7828 | ok |
| meetup:berlincplusplus | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8013 | ok |
| meetup:llvm-social-darmstadt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8063 | ok |
| meetup:lean-coffee-karlsruhe-frankfurt | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7978 | ok |
| meetup:aws-user-group-bergstrasse | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8045 | ok |
| meetup:modern-work-munster | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8003 | ok |
| meetup:leaddev-meetup-munich | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7917 | ok |
| meetup:gemeinsam-mit-ki-koeln | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7961 | ok |
| meetup:php-user-group-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7978 | ok |
| meetup:elixir-ruhr-dev | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7893 | ok |
| meetup:owasp-cologne-chapter | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7895 | ok |
| meetup:lean-agile-sh | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8081 | ok |
| meetup:bochum-network-security-meetup-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7982 | ok |
| meetup:tech-meetup-sauerland | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8047 | ok |
| meetup:hack-the-box-meetup-leipzig-de | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8002 | ok |
| meetup:tech-talk-karlsruhe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7854 | ok |
| meetup:berlin-amazon-web-services-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7969 | ok |
| meetup:hackergarten-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8019 | ok |
| meetup:leaddev-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7955 | ok |
| meetup:audio-developer-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7874 | ok |
| meetup:opencoffeeclub_hamburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7994 | ok |
| meetup:robot-framework-usergroup-munsterland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7997 | ok |
| meetup:main-kinzig-nerds | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7980 | ok |
| meetup:rust-rhein-main | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7956 | ok |
| meetup:quality-engineering-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7976 | ok |
| meetup:do-dotnet | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8037 | ok |
| meetup:bergisches-entwicklerforum | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8017 | ok |
| meetup:cto-roundtable-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7955 | ok |
| meetup:tubingen-postgresql-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7742 | ok |
| meetup:42-shades-of-it | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7999 | ok |
| meetup:devops-freiburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7975 | ok |
| meetup:afterwork-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7956 | ok |
| meetup:react-berlin-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7957 | ok |
| meetup:webmontag-kassel | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7935 | ok |
| meetup:hannovr | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7976 | ok |
| meetup:cybersecurity-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8001 | ok |
| meetup:aws-user-group-bodensee | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7994 | ok |
| meetup:erfurt-wordpress-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8010 | ok |
| meetup:cyberforum-e-v-karlsruhe-hightech-unternehmer-netzwerk | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8315 | ok |
| meetup:auditing-ai-beyond-the-prompt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8019 | ok |
| meetup:dortmund-aws-user-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7999 | ok |
| meetup:aws-usergroup-munsterland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8005 | ok |
| meetup:digitalhubms | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7990 | ok |
| meetup:phpug-rhein-neckar | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7971 | ok |
| meetup:codecentric-dortmund-tech-talk | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8010 | ok |
| meetup:docker-black-forest | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7879 | ok |
| meetup:ddd-muc | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8225 | ok |
| meetup:php-usergroup-dresden | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7994 | ok |
| meetup:aachen-maker-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8012 | ok |
| meetup:ccdd-conciso-coding-dojo-dortmund | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7707 | ok |
| meetup:berlinawsug | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8038 | ok |
| meetup:owasp-augsburg-chapter | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7932 | ok |
| meetup:tech-n-talk-frankfurt | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8043 | ok |
| meetup:software-technology-meetup-pforzheim | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7995 | ok |
| meetup:gdg-hannover | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7998 | ok |
| meetup:bonn-bitcoin-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7981 | ok |
| meetup:scrumtisch-bonn | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7934 | ok |
| meetup:domain-driven-design-rhein-main | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7936 | ok |
| meetup:webwirtschaft | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7859 | ok |
| meetup:claude-meetup-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8035 | ok |
| meetup:data-ai-meetup-koln | curated | 0 | 0 | 0 | 0 | 0 | 0 | 6165 | empty |
| meetup:data-visualization-meetup-hamburg | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7145 | empty |
| meetup:berlin-computer-vision-group | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7829 | empty |
| meetup:berlin-women-in-machine-learning-and-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7982 | empty |
| meetup:kaggle-berlin | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7972 | empty |
| meetup:data-science-and-ai-frankfurt | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7958 | empty |
| meetup:applydata-munich | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7670 | empty |
| meetup:ai-transformation-camp | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7957 | empty |
| eventbrite-berlin | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-munich | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-cologne | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-hamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-stuttgart | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| startupcity-hamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 1199 | empty |
| meetup:bochum-meetup-and-explore-the-community-meetup-group | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7973 | empty |
| meetup:hamburger-indie-treff | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7809 | empty |
| meetup:google-developers-group-munster | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7911 | empty |
| meetup:wpmeetup-potsdam | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8003 | empty |

## Scrape sources

| source | status | text chars | links | detail |
| --- | --- | --- | --- | --- |
| scrape:allai | not due |  |  | weekend |
| scrape:frankeundschwarz | not due |  |  | weekend |
| scrape:eventseye | not due |  |  | weekend |
| scrape:conferenceindex | not due |  |  | weekend |
| scrape:ki-verband-community | skipped |  |  | js: true (Playwright arrives later) |
| scrape:ki-verband-events | not due |  |  | weekend |
| scrape:bitkom | not due |  |  | weekend |
| scrape:bifold | not due |  |  | weekend |
| scrape:cyber-valley | skipped |  |  | js: true (Playwright arrives later) |
| scrape:lamarr | not due |  |  | weekend |
| scrape:scads | skipped |  |  | js: true (Playwright arrives later) |
| scrape:appliedai | not due |  |  | weekend |
| scrape:ellis | not due |  |  | weekend |
| scrape:ellis-tuebingen | not due |  |  | weekend |
| scrape:tum-mdsi | not due |  |  | weekend |
| scrape:tu-berlin | not due |  |  | weekend |
| scrape:hpi | not due |  |  | weekend |
| scrape:kit | not due |  |  | weekend |
| scrape:helmholtz-ai | not due |  |  | weekend |
| scrape:fraunhofer | not due |  |  | weekend |
| scrape:gi | not due |  |  | weekend |
| scrape:gi-fb-ki | not due |  |  | weekend |
| scrape:mpg | skipped |  |  | js: true (Playwright arrives later) |
| scrape:ai-hub-lmu | not due |  |  | weekend |
| scrape:unternehmertum | not due |  |  | weekend |
| scrape:nextmedia-hamburg | not due |  |  | weekend |
| scrape:techquartier | skipped |  |  | js: true (Playwright arrives later) |
| scrape:starthub-hessen | not due |  |  | weekend |
| scrape:startplatz | not due |  |  | weekend |
| scrape:startup-region-stuttgart | not due |  |  | weekend |
| scrape:it-region-stuttgart | not due |  |  | weekend |
| scrape:aitinkerers-berlin | not due |  |  | weekend |
| scrape:aitinkerers-munich | not due |  |  | weekend |
| scrape:aitinkerers-hamburg | not due |  |  | weekend |

## Per city (after dedupe)

| city group | clusters | known | new |
| --- | --- | --- | --- |
| Berlin | 100 | 98 | 2 |
| Other Germany | 75 | 74 | 1 |
| Munich | 49 | 49 | 0 |
| Hamburg | 42 | 42 | 0 |
| Unknown | 29 | 29 | 0 |
| Frankfurt | 29 | 29 | 0 |
| Cologne | 25 | 25 | 0 |
| Online (DE) | 9 | 9 | 0 |
| Stuttgart | 8 | 8 | 0 |

Places inside "Other Germany" (after dedupe): Nuremberg 15, Leipzig 10, Hanover 6, Karlsruhe 5, Münster 5, Warendorf 5, Heidelberg 4, Freiburg 4, Dortmund 4, Chemnitz 3, Kiel 2, Dresden 2, Fürth 1, Kassel 1, Erlangen 1

## Dropped by filters (all sources)

| reason | count |
| --- | --- |
| country | 792 |
| keyword | 522 |
| window | 325 |
| long | 4 |
| excluded | 1 |

## 10 largest dedupe clusters

| members | title | sources |
| --- | --- | --- |
| 11 | IBM Bob Coding Watch Party in Berlin & Online | meetup:ibmpoweraiberlin, meetup:big-data-developers-in-berlin, meetup:ibmpoweraifrankfurt, meetup:ibm-developers, hackevents-ai, hackevents-data |
| 7 | AI Coding Summit Berlin | meetup:berlinai, agentconfs, brainberg, hackevents-ai, aieventlist-berlin, aieventlist-europe |
| 6 | AWS UG Frankfurt with Grafana UG: Keycloak SLIs & Traffic Data in Grafana | meetup:fra_aws, meetup:grafana-friends-frankfurt, hackevents-ai, hackevents-data, brainberg |
| 6 | DevFest Munich 2026 - Munich Innovates: AI, Cloud & Beyond | meetup:gdg-munich, brainberg, hackevents-ai, hackevents-data, aieventlist-munich, aieventlist-europe |
| 6 | DATA festival 2027 | deutschlandki, agentconfs, hackevents-ai, hackevents-data, aieventlist-munich, aieventlist-europe |
| 5 | Build Boldly, Fly Responsibly: AI Stories from Women in Tech | meetup:womentechmakershamburg, luma-hamburg, hackevents-ai, hackevents-data, brainberg |
| 5 | AI Builders Hamburg - Bring Your Own Laptop Edition - Dec 3 | meetup:aibuildersclub, hackevents-ai, hackevents-data, brainberg |
| 4 | Bob TV Episode 4: Why generic AI fails at mainframe scale - and what works | meetup:ibmpoweraiberlin, meetup:big-data-developers-in-berlin, meetup:ibmpoweraifrankfurt, meetup:ibm-developers |
| 4 | HH DS + ML Meetup at PIA Media | meetup:hamburg-data-science-meetup, hackevents-ai, hackevents-data, brainberg |
| 4 | Agentic AI Treffen im Dezember | meetup:agentic-ai-frankfurt, luma-frankfurt, hackevents-ai, brainberg |

## Failed or empty sources

- meetup:data-ai-meetup-koln: empty (0 items)
- meetup:data-visualization-meetup-hamburg: empty (0 items)
- meetup:berlin-computer-vision-group: empty (0 items)
- meetup:berlin-women-in-machine-learning-and-data-science: empty (0 items)
- meetup:kaggle-berlin: empty (0 items)
- meetup:data-science-and-ai-frankfurt: empty (0 items)
- meetup:applydata-munich: empty (0 items)
- meetup:ai-transformation-camp: empty (0 items)
- startupcity-hamburg: empty (0 items, 30 raw) - feed items carry no event date (pubDate is the publish date); needs a per-page fetch

## Notes

- Ledger/ health/ cache files written; elapsed 193 s.
