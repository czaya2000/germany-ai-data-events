# Prepare run report

- Date: 2026-11-20 (window 120 days), mode: daily
- Feed sources: 201/207 reachable (97%)
- Totals: fetched 2191, in-window German 1086, after keyword filter 586, after dedupe 340, known 339, new 1, sent to Claude 1, deferred by cap 0
- Ledger: 939 entries, 0 pruned

## Per source (feed)

Columns: fetched = items parsed and normalised; in-window DE = passed country, window, cancelled and duration checks; kept = also passed the keyword filter; dedupe = clusters the source took part in; primary = clusters whose best record came from this source.

| source | trust | fetched | in-window DE | kept | dedupe | primary | errors | ms | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agentconfs | curated | 558 | 16 | 16 | 16 | 10 | 0 | 259 | ok |
| brainberg | noisy | 299 | 228 | 95 | 92 | 13 | 0 | 3040 | ok |
| hackevents-ai | noisy | 232 | 209 | 177 | 173 | 106 | 0 | 626 | ok |
| aieventlist-europe | curated | 172 | 27 | 27 | 27 | 10 | 0 | 1275 | ok |
| confstech | noisy | 138 | 5 | 1 | 1 | 0 | 0 | 1066 | ok |
| hackevents-data | noisy | 60 | 52 | 44 | 44 | 9 | 0 | 560 | ok |
| luma-berlin | noisy | 54 | 54 | 3 | 3 | 3 | 0 | 1089 | ok |
| deutschlandki | curated | 52 | 19 | 19 | 19 | 19 | 0 | 426 | ok |
| bwcon | noisy | 24 | 16 | 4 | 4 | 3 | 0 | 861 | ok |
| luma-hamburg | noisy | 23 | 23 | 6 | 6 | 4 | 0 | 2037 | ok |
| devevents | noisy | 22 | 4 | 1 | 1 | 1 | 0 | 708 | ok |
| luma-munich | noisy | 20 | 20 | 4 | 4 | 4 | 0 | 1299 | ok |
| lmu | noisy | 20 | 16 | 1 | 1 | 1 | 0 | 969 | ok |
| aieventlist-berlin | curated | 17 | 10 | 10 | 10 | 4 | 0 | 1286 | ok |
| aieventlist-munich | curated | 12 | 11 | 11 | 11 | 9 | 0 | 2065 | ok |
| meetup:ai-beavers | noisy | 10 | 10 | 10 | 10 | 10 | 0 | 8031 | ok |
| luma-frankfurt | noisy | 10 | 10 | 1 | 1 | 1 | 0 | 2211 | ok |
| caiml | curated | 10 | 0 | 0 | 0 | 0 | 0 | 730 | ok |
| meetup:jug-bb | noisy | 10 | 5 | 0 | 0 | 0 | 0 | 3681 | ok |
| meetup:silicon-allee-events | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8218 | ok |
| meetup:stuttgart-industrie-4-0-und-iot-meetup | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 8154 | ok |
| meetup:heidelberg-makers-meetup | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8216 | ok |
| meetup:game-developers-berlin | noisy | 10 | 5 | 0 | 0 | 0 | 0 | 8243 | ok |
| meetup:unternehmer-startups-meetup-rosenheim | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8155 | ok |
| meetup:uxchange | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8088 | ok |
| meetup:rosenheim-bitcoin-stammtisch | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8195 | ok |
| meetup:java-user-group-hannover | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 8017 | ok |
| meetup:leipzig-wordpress-meetup | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 8055 | ok |
| meetup:bitcoinkarlsruhe | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8146 | ok |
| meetup:softwerkskammer-luebeck | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8040 | ok |
| meetup:kubernetes-meetup-bielefeld | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8099 | ok |
| meetup:wpmeetup-stuttgart | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8119 | ok |
| meetup:chiemseebitcoinandblockchainmeetup | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8137 | ok |
| meetup:gamedevmuc | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8013 | ok |
| meetup:berlin-wordpress-meetup | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8241 | ok |
| meetup:betreute-intelligenz | curated | 9 | 5 | 5 | 5 | 5 | 0 | 8137 | ok |
| mcml | curated | 8 | 8 | 6 | 6 | 6 | 0 | 558 | ok |
| hessian-ai | curated | 8 | 8 | 7 | 7 | 7 | 0 | 953 | ok |
| meetup:muenster-macht-agil | noisy | 8 | 8 | 0 | 0 | 0 | 0 | 8127 | ok |
| meetup:decentralized-trust-ruhrgebiet | noisy | 8 | 8 | 3 | 3 | 3 | 0 | 8160 | ok |
| meetup:pirateskills | curated | 7 | 4 | 4 | 4 | 4 | 0 | 8218 | ok |
| meetup:ibm-developers | noisy | 7 | 7 | 7 | 2 | 0 | 0 | 8116 | ok |
| meetup:bliss-speaker-series | curated | 6 | 6 | 6 | 6 | 6 | 0 | 8146 | ok |
| gfw-warendorf | curated | 6 | 6 | 4 | 4 | 4 | 0 | 1398 | ok |
| meetup:berlin-software-engineering-leadership-meetup-group | noisy | 6 | 6 | 0 | 0 | 0 | 0 | 8015 | ok |
| aieventlist-frankfurt | curated | 5 | 2 | 2 | 2 | 1 | 0 | 3061 | ok |
| meetup:startup-factory-boost-network | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 8149 | ok |
| meetup:hannover-unity-meetup | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 8090 | ok |
| meetup:code-for-munster | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 8039 | ok |
| meetup:spawnpoint | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 7926 | ok |
| meetup:ai-nights-nurnberg | curated | 4 | 4 | 4 | 4 | 4 | 0 | 8078 | ok |
| meetup:liberating-structures-user-group-rhein-main | noisy | 4 | 2 | 0 | 0 | 0 | 0 | 8324 | ok |
| meetup:ksug-in | noisy | 4 | 4 | 4 | 4 | 4 | 0 | 7869 | ok |
| meetup:munchen-ai-machine-learning-and-computer-vision-meetup | curated | 3 | 3 | 2 | 2 | 2 | 0 | 4231 | ok |
| meetup:maikers-ai-community | curated | 3 | 3 | 3 | 3 | 3 | 0 | 7949 | ok |
| meetup:prompting-lab | noisy | 3 | 3 | 3 | 3 | 3 | 0 | 8026 | ok |
| aieventlist-hamburg | curated | 3 | 2 | 2 | 2 | 1 | 0 | 3935 | ok |
| meetup:digital-craftsmanship-nordoberpfalz | noisy | 3 | 2 | 2 | 2 | 2 | 0 | 7756 | ok |
| meetup:berlindroid | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8044 | ok |
| meetup:hannover-python-meetup | noisy | 3 | 3 | 3 | 3 | 3 | 0 | 8065 | ok |
| meetup:gdg-nuremberg | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8003 | ok |
| meetup:gamedevtreff-ruhrpott | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 7979 | ok |
| meetup:it-security-kassel | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8044 | ok |
| meetup:pydata-berlin | curated | 2 | 2 | 2 | 2 | 2 | 0 | 379 | ok |
| meetup:pydata-hamburg | curated | 2 | 2 | 2 | 2 | 1 | 0 | 1206 | ok |
| meetup:ibmpoweraiberlin | curated | 2 | 2 | 2 | 2 | 2 | 0 | 5214 | ok |
| meetup:ai-agenten-frankfurt | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8012 | ok |
| aieventlist-cologne | curated | 2 | 2 | 2 | 2 | 0 | 0 | 4355 | ok |
| meetup:big-data-developers-in-berlin | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 7975 | ok |
| meetup:ibmpoweraifrankfurt | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 8003 | ok |
| meetup:big-data-developers-in-munich | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 8303 | ok |
| meetup:ibm-powerai-dusseldorf | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 8029 | ok |
| meetup:jug-hamburg | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7431 | ok |
| meetup:main-valley | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 7887 | ok |
| meetup:give-a-go | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7815 | ok |
| meetup:berlinbanktechnights | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8125 | ok |
| meetup:frontend-meetup-freiburg | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 7995 | ok |
| meetup:opentechschool-leipzig | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8059 | ok |
| meetup:rewe-digital-events-cologne | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8045 | ok |
| meetup:godot-stammtisch-karlsruhe | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7941 | ok |
| meetup:azure-serverless-koln | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8009 | ok |
| meetup:the-test-tribe-frankfurt-meetup | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8042 | ok |
| meetup:ai-professionals-munich | curated | 1 | 1 | 1 | 1 | 0 | 0 | 2178 | ok |
| meetup:munich-datageeks | curated | 1 | 1 | 1 | 1 | 1 | 0 | 3166 | ok |
| meetup:hamburg-data-science-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8018 | ok |
| meetup:clickhouse-meetup-munich | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8010 | ok |
| meetup:berlinai | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8000 | ok |
| meetup:ai-agents-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7830 | ok |
| meetup:agentic-ai-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7851 | ok |
| meetup:sovereign-ai-meetup-ulm | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7781 | ok |
| meetup:bonner-ki-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7999 | ok |
| meetup:ai-school-leipzig | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7978 | ok |
| meetup:ai-cloud-innovation-karlsruhe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8020 | ok |
| meetup:kassel-data-science-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7999 | ok |
| meetup:artificial-intelligence-meetup-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8062 | ok |
| meetup:heidelberg-knowledge-graph-ai-hub | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8042 | ok |
| meetup:munich-snowflake-data-cloud-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8009 | ok |
| meetup:beads-berlin-ecosystem-for-analytics-and-data-systems | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8032 | ok |
| meetup:pass-microsoft-data-platform-usergroup-rheinland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7933 | ok |
| meetup:awsughh | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8029 | ok |
| meetup:fra_aws | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8037 | ok |
| meetup:ai-transformation-camp | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7991 | ok |
| meetup:pydata-munchen | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 133 | ok |
| meetup:grafana-friends-frankfurt | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 1136 | ok |
| meetup:producttank-nuernberg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 1869 | ok |
| meetup:tech-talk-stuttgart | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 2699 | ok |
| meetup:owasp-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 4294 | ok |
| meetup:wtm-berlin | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 4910 | ok |
| meetup:producttank-munich | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 5603 | ok |
| meetup:azure-dusseldorf-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6002 | ok |
| meetup:openmates-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6607 | ok |
| meetup:inovex-meetup-erlangen | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6976 | ok |
| meetup:cybercologne-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8002 | ok |
| meetup:azure-bonn-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8075 | ok |
| meetup:gdg-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7963 | ok |
| meetup:net-user-group-karlsruhe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7950 | ok |
| meetup:isaqb-software-architektur-meetup-gruppe-fur-interessierte | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7757 | ok |
| meetup:django-cologne | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7939 | ok |
| meetup:mannheim-java-usergroup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7994 | ok |
| meetup:pass-usergroup-rhein-main | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7995 | ok |
| meetup:bochum-meetup-and-explore-the-community-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8005 | ok |
| meetup:hamburger-indie-treff | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7909 | ok |
| meetup:google-developers-group-munster | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7922 | ok |
| meetup:wpmeetup-potsdam | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8004 | ok |
| meetup:checkmk-munich-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7980 | ok |
| meetup:devtalk-tk | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7725 | ok |
| meetup:womentechmakershamburg | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8014 | ok |
| meetup:meetup-group-pnulfhzz | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8026 | ok |
| meetup:prodot-insights | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7981 | ok |
| meetup:padagility | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7933 | ok |
| meetup:cloud-native-munster | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8039 | ok |
| meetup:meetup-group-igafblfy | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8012 | ok |
| meetup:meetup-group-tfyvuydp | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7984 | ok |
| meetup:cloud-native-night | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7921 | ok |
| meetup:leipzig-golang | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7970 | ok |
| meetup:nordic-coding | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7996 | ok |
| meetup:node-code-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7684 | ok |
| meetup:rust-dortmund | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7935 | ok |
| meetup:jug-nurnberg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8009 | ok |
| meetup:le-software-craft-community | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8016 | ok |
| meetup:tech-talk-muenster | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8026 | ok |
| meetup:opensource-ruhr | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8005 | ok |
| meetup:scrum-user-group-karlsruhe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7849 | ok |
| meetup:berlincplusplus | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8051 | ok |
| meetup:llvm-social-darmstadt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7980 | ok |
| meetup:lean-coffee-karlsruhe-frankfurt | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8001 | ok |
| meetup:aws-user-group-bergstrasse | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8001 | ok |
| meetup:modern-work-munster | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8013 | ok |
| meetup:leaddev-meetup-munich | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7883 | ok |
| meetup:gemeinsam-mit-ki-koeln | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7964 | ok |
| meetup:php-user-group-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7982 | ok |
| meetup:elixir-ruhr-dev | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7926 | ok |
| meetup:owasp-cologne-chapter | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7851 | ok |
| meetup:lean-agile-sh | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8092 | ok |
| meetup:bochum-network-security-meetup-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8022 | ok |
| meetup:tech-meetup-sauerland | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7979 | ok |
| meetup:hack-the-box-meetup-leipzig-de | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7939 | ok |
| meetup:tech-talk-karlsruhe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7795 | ok |
| meetup:berlin-amazon-web-services-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7937 | ok |
| meetup:hackergarten-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8022 | ok |
| meetup:leaddev-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8021 | ok |
| meetup:audio-developer-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7898 | ok |
| meetup:opencoffeeclub_hamburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7999 | ok |
| meetup:robot-framework-usergroup-munsterland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7971 | ok |
| meetup:main-kinzig-nerds | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8019 | ok |
| meetup:rust-rhein-main | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7878 | ok |
| meetup:quality-engineering-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7980 | ok |
| meetup:do-dotnet | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7993 | ok |
| meetup:bergisches-entwicklerforum | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7978 | ok |
| meetup:cto-roundtable-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7914 | ok |
| meetup:tubingen-postgresql-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7862 | ok |
| meetup:42-shades-of-it | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8036 | ok |
| meetup:devops-freiburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8032 | ok |
| meetup:afterwork-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8349 | ok |
| meetup:react-berlin-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8042 | ok |
| meetup:webmontag-kassel | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7902 | ok |
| meetup:hannovr | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7980 | ok |
| meetup:cybersecurity-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7986 | ok |
| meetup:aws-user-group-bodensee | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7996 | ok |
| meetup:erfurt-wordpress-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7986 | ok |
| meetup:cyberforum-e-v-karlsruhe-hightech-unternehmer-netzwerk | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7680 | ok |
| meetup:auditing-ai-beyond-the-prompt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8006 | ok |
| meetup:dortmund-aws-user-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8017 | ok |
| meetup:aws-usergroup-munsterland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8008 | ok |
| meetup:digitalhubms | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7932 | ok |
| meetup:phpug-rhein-neckar | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7994 | ok |
| meetup:codecentric-dortmund-tech-talk | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8280 | ok |
| meetup:docker-black-forest | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7868 | ok |
| meetup:ddd-muc | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7987 | ok |
| meetup:php-usergroup-dresden | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8004 | ok |
| meetup:aachen-maker-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8284 | ok |
| meetup:ccdd-conciso-coding-dojo-dortmund | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7870 | ok |
| meetup:data-ai-meetup-koln | curated | 0 | 0 | 0 | 0 | 0 | 0 | 6165 | empty |
| meetup:data-visualization-meetup-hamburg | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7154 | empty |
| meetup:berlin-computer-vision-group | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7757 | empty |
| meetup:berlin-women-in-machine-learning-and-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7938 | empty |
| meetup:kaggle-berlin | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8026 | empty |
| meetup:data-science-and-ai-frankfurt | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7976 | empty |
| meetup:applydata-munich | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7904 | empty |
| eventbrite-berlin | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 273 | FAILED: HTTP 405 |
| eventbrite-munich | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 741 | FAILED: HTTP 405 |
| eventbrite-cologne | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 1335 | FAILED: HTTP 405 |
| eventbrite-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 2317 | FAILED: HTTP 405 |
| eventbrite-hamburg | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 3006 | FAILED: HTTP 405 |
| eventbrite-stuttgart | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 4001 | FAILED: HTTP 405 |
| aieventlist-stuttgart | curated | 0 | 0 | 0 | 0 | 0 | 0 | 5060 | empty |
| startupcity-hamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 921 | empty |

## Scrape sources

| source | status | text chars | links | detail |
| --- | --- | --- | --- | --- |
| scrape:frankeundschwarz | not due |  |  | slot day 1 |
| scrape:eventseye | not due |  |  | slot day 1 |
| scrape:conferenceindex | not due |  |  | slot day 1 |
| scrape:ki-verband-community | skipped |  |  | js: true (Playwright arrives later) |
| scrape:ki-verband-events | not due |  |  | slot day 1 |
| scrape:bitkom | not due |  |  | slot day 1 |
| scrape:bifold | not due |  |  | slot day 2 |
| scrape:cyber-valley | skipped |  |  | js: true (Playwright arrives later) |
| scrape:lamarr | not due |  |  | slot day 2 |
| scrape:scads | skipped |  |  | js: true (Playwright arrives later) |
| scrape:appliedai | not due |  |  | slot day 2 |
| scrape:ellis | not due |  |  | slot day 2 |
| scrape:ellis-tuebingen | not due |  |  | slot day 2 |
| scrape:tum-mdsi | not due |  |  | slot day 2 |
| scrape:tu-berlin | not due |  |  | slot day 3 |
| scrape:hpi | not due |  |  | slot day 3 |
| scrape:kit | not due |  |  | slot day 3 |
| scrape:helmholtz-ai | not due |  |  | slot day 3 |
| scrape:fraunhofer | not due |  |  | slot day 3 |
| scrape:gi | not due |  |  | slot day 3 |
| scrape:gi-fb-ki | not due |  |  | slot day 3 |
| scrape:mpg | skipped |  |  | js: true (Playwright arrives later) |
| scrape:ai-hub-lmu | not due |  |  | slot day 3 |
| scrape:unternehmertum | not due |  |  | slot day 4 |
| scrape:nextmedia-hamburg | not due |  |  | slot day 4 |
| scrape:techquartier | skipped |  |  | js: true (Playwright arrives later) |
| scrape:starthub-hessen | not due |  |  | slot day 4 |
| scrape:startplatz | not due |  |  | slot day 4 |
| scrape:startup-region-stuttgart | not due |  |  | slot day 4 |
| scrape:it-region-stuttgart | not due |  |  | slot day 4 |
| scrape:aitinkerers-berlin | not due |  |  | slot day 4 |
| scrape:aitinkerers-munich | not due |  |  | slot day 4 |
| scrape:aitinkerers-hamburg | not due |  |  | slot day 4 |
| scrape:allai | ready | 20409 | 36 |  |

## Per city (after dedupe)

| city group | clusters | known | new |
| --- | --- | --- | --- |
| Berlin | 88 | 88 | 0 |
| Other Germany | 75 | 75 | 0 |
| Munich | 47 | 46 | 1 |
| Hamburg | 43 | 43 | 0 |
| Frankfurt | 28 | 28 | 0 |
| Cologne | 22 | 22 | 0 |
| Unknown | 20 | 20 | 0 |
| Online (DE) | 9 | 9 | 0 |
| Stuttgart | 8 | 8 | 0 |

Places inside "Other Germany" (after dedupe): Nuremberg 15, Münster 6, Leipzig 6, Hanover 6, Karlsruhe 5, Warendorf 5, Heidelberg 4, Freiburg 4, Kiel 2, Dortmund 2, Essen 2, Chemnitz 2, Fürth 1, Kassel 1, Königswinter 1

## Dropped by filters (all sources)

| reason | count |
| --- | --- |
| country | 801 |
| keyword | 499 |
| window | 300 |
| long | 4 |
| excluded | 1 |

## 10 largest dedupe clusters

| members | title | sources |
| --- | --- | --- |
| 13 | IBM Bob Coding Watch Party in Berlin & Online | meetup:ibmpoweraiberlin, meetup:big-data-developers-in-berlin, meetup:ibmpoweraifrankfurt, meetup:ibm-developers, meetup:big-data-developers-in-munich, meetup:ibm-powerai-dusseldorf, hackevents-ai, hackevents-data |
| 7 | AI Coding Summit Berlin | meetup:berlinai, agentconfs, brainberg, hackevents-ai, aieventlist-berlin, aieventlist-europe |
| 6 | Bob TV Episode 4: Why generic AI fails at mainframe scale - and what works | meetup:ibmpoweraiberlin, meetup:big-data-developers-in-berlin, meetup:ibmpoweraifrankfurt, meetup:ibm-developers, meetup:big-data-developers-in-munich, meetup:ibm-powerai-dusseldorf |
| 6 | AWS UG Frankfurt with Grafana UG: Keycloak SLIs & Traffic Data in Grafana | meetup:fra_aws, meetup:grafana-friends-frankfurt, hackevents-ai, hackevents-data, brainberg |
| 6 | DevFest Munich 2026 - Munich Innovates: AI, Cloud & Beyond | meetup:gdg-munich, brainberg, hackevents-ai, hackevents-data, aieventlist-munich, aieventlist-europe |
| 6 | MLcon Berlin 2026 | deutschlandki, agentconfs, hackevents-ai, hackevents-data, aieventlist-berlin, aieventlist-europe |
| 6 | DATA festival 2027 | deutschlandki, agentconfs, hackevents-ai, hackevents-data, aieventlist-munich, aieventlist-europe |
| 5 | DevFest Münster 2026 / Agentic AI Hackathon | meetup:google-developers-group-munster, brainberg, aieventlist-europe, hackevents-ai |
| 5 | Build Boldly, Fly Responsibly: AI Stories from Women in Tech | meetup:womentechmakershamburg, luma-hamburg, hackevents-ai, hackevents-data, brainberg |
| 5 | AI Engineering Summit 2026 | deutschlandki, confstech, hackevents-ai, aieventlist-berlin, aieventlist-europe |

## Failed or empty sources

- eventbrite-berlin: FAILED (HTTP 405)
- eventbrite-munich: FAILED (HTTP 405)
- eventbrite-cologne: FAILED (HTTP 405)
- eventbrite-frankfurt: FAILED (HTTP 405)
- eventbrite-hamburg: FAILED (HTTP 405)
- eventbrite-stuttgart: FAILED (HTTP 405)
- meetup:data-ai-meetup-koln: empty (0 items)
- meetup:data-visualization-meetup-hamburg: empty (0 items)
- meetup:berlin-computer-vision-group: empty (0 items)
- meetup:berlin-women-in-machine-learning-and-data-science: empty (0 items)
- meetup:kaggle-berlin: empty (0 items)
- meetup:data-science-and-ai-frankfurt: empty (0 items)
- meetup:applydata-munich: empty (0 items)
- aieventlist-stuttgart: empty (0 items)
- startupcity-hamburg: empty (0 items, 30 raw) - feed items carry no event date (pubDate is the publish date); needs a per-page fetch

## Notes

- Ledger/ health/ cache files written; elapsed 178 s.
