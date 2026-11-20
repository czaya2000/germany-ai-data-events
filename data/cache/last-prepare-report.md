# Prepare run report

- Date: 2026-11-20 (window 120 days), mode: bootstrap
- Feed sources: 201/207 reachable (97%)
- Totals: fetched 2192, in-window German 1087, after keyword filter 586, after dedupe 340, known 0, new 340, sent to Claude 340, deferred by cap 0
- Ledger: 0 entries, 0 pruned

## Per source (feed)

Columns: fetched = items parsed and normalised; in-window DE = passed country, window, cancelled and duration checks; kept = also passed the keyword filter; dedupe = clusters the source took part in; primary = clusters whose best record came from this source.

| source | trust | fetched | in-window DE | kept | dedupe | primary | errors | ms | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agentconfs | curated | 558 | 16 | 16 | 16 | 10 | 0 | 112 | ok |
| brainberg | noisy | 299 | 228 | 95 | 92 | 13 | 0 | 2191 | ok |
| hackevents-ai | noisy | 232 | 209 | 177 | 173 | 106 | 0 | 206 | ok |
| aieventlist-europe | curated | 172 | 27 | 27 | 27 | 10 | 0 | 159 | ok |
| confstech | noisy | 138 | 5 | 1 | 1 | 0 | 0 | 1176 | ok |
| hackevents-data | noisy | 60 | 52 | 44 | 44 | 9 | 0 | 880 | ok |
| luma-berlin | noisy | 54 | 54 | 3 | 3 | 3 | 0 | 1222 | ok |
| deutschlandki | curated | 52 | 19 | 19 | 19 | 19 | 0 | 111 | ok |
| bwcon | noisy | 24 | 16 | 4 | 4 | 3 | 0 | 300 | ok |
| luma-hamburg | noisy | 23 | 23 | 6 | 6 | 4 | 0 | 2043 | ok |
| devevents | noisy | 22 | 4 | 1 | 1 | 1 | 0 | 174 | ok |
| luma-munich | noisy | 20 | 20 | 4 | 4 | 4 | 0 | 1300 | ok |
| lmu | noisy | 20 | 16 | 1 | 1 | 1 | 0 | 157 | ok |
| aieventlist-berlin | curated | 17 | 10 | 10 | 10 | 4 | 0 | 988 | ok |
| aieventlist-munich | curated | 12 | 11 | 11 | 11 | 9 | 0 | 1955 | ok |
| meetup:ai-beavers | noisy | 10 | 10 | 10 | 10 | 10 | 0 | 8044 | ok |
| luma-frankfurt | noisy | 10 | 10 | 1 | 1 | 1 | 0 | 2273 | ok |
| caiml | curated | 10 | 0 | 0 | 0 | 0 | 0 | 139 | ok |
| meetup:jug-bb | noisy | 10 | 5 | 0 | 0 | 0 | 0 | 3701 | ok |
| meetup:silicon-allee-events | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8062 | ok |
| meetup:stuttgart-industrie-4-0-und-iot-meetup | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 8526 | ok |
| meetup:heidelberg-makers-meetup | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8098 | ok |
| meetup:game-developers-berlin | noisy | 10 | 5 | 0 | 0 | 0 | 0 | 8245 | ok |
| meetup:unternehmer-startups-meetup-rosenheim | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8031 | ok |
| meetup:uxchange | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8079 | ok |
| meetup:rosenheim-bitcoin-stammtisch | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8152 | ok |
| meetup:java-user-group-hannover | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 0 | ok |
| meetup:leipzig-wordpress-meetup | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:bitcoinkarlsruhe | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:softwerkskammer-luebeck | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:kubernetes-meetup-bielefeld | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:wpmeetup-stuttgart | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:chiemseebitcoinandblockchainmeetup | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:gamedevmuc | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:berlin-wordpress-meetup | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:betreute-intelligenz | curated | 9 | 5 | 5 | 5 | 5 | 0 | 8224 | ok |
| mcml | curated | 8 | 8 | 6 | 6 | 6 | 0 | 138 | ok |
| hessian-ai | curated | 8 | 8 | 7 | 7 | 7 | 0 | 379 | ok |
| meetup:muenster-macht-agil | noisy | 8 | 8 | 0 | 0 | 0 | 0 | 8089 | ok |
| meetup:decentralized-trust-ruhrgebiet | noisy | 8 | 8 | 3 | 3 | 3 | 0 | 0 | ok |
| meetup:pirateskills | curated | 7 | 4 | 4 | 4 | 4 | 0 | 8134 | ok |
| gfw-warendorf | curated | 7 | 7 | 4 | 4 | 4 | 0 | 943 | ok |
| meetup:ibm-developers | noisy | 7 | 7 | 7 | 2 | 0 | 0 | 8129 | ok |
| meetup:bliss-speaker-series | curated | 6 | 6 | 6 | 6 | 6 | 0 | 8081 | ok |
| meetup:berlin-software-engineering-leadership-meetup-group | noisy | 6 | 6 | 0 | 0 | 0 | 0 | 7972 | ok |
| aieventlist-frankfurt | curated | 5 | 2 | 2 | 2 | 1 | 0 | 2885 | ok |
| meetup:startup-factory-boost-network | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 8104 | ok |
| meetup:hannover-unity-meetup | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 8087 | ok |
| meetup:code-for-munster | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:spawnpoint | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:ai-nights-nurnberg | curated | 4 | 4 | 4 | 4 | 4 | 0 | 8168 | ok |
| meetup:liberating-structures-user-group-rhein-main | noisy | 4 | 2 | 0 | 0 | 0 | 0 | 8071 | ok |
| meetup:ksug-in | noisy | 4 | 4 | 4 | 4 | 4 | 0 | 0 | ok |
| meetup:munchen-ai-machine-learning-and-computer-vision-meetup | curated | 3 | 3 | 2 | 2 | 2 | 0 | 4356 | ok |
| meetup:maikers-ai-community | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8027 | ok |
| meetup:prompting-lab | noisy | 3 | 3 | 3 | 3 | 3 | 0 | 8127 | ok |
| aieventlist-hamburg | curated | 3 | 2 | 2 | 2 | 1 | 0 | 3396 | ok |
| meetup:digital-craftsmanship-nordoberpfalz | noisy | 3 | 2 | 2 | 2 | 2 | 0 | 7819 | ok |
| meetup:berlindroid | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8019 | ok |
| meetup:hannover-python-meetup | noisy | 3 | 3 | 3 | 3 | 3 | 0 | 0 | ok |
| meetup:gdg-nuremberg | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:gamedevtreff-ruhrpott | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:it-security-kassel | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:pydata-berlin | curated | 2 | 2 | 2 | 2 | 2 | 0 | 405 | ok |
| meetup:pydata-hamburg | curated | 2 | 2 | 2 | 2 | 1 | 0 | 1212 | ok |
| meetup:ibmpoweraiberlin | curated | 2 | 2 | 2 | 2 | 2 | 0 | 5295 | ok |
| meetup:ai-agenten-frankfurt | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8060 | ok |
| aieventlist-cologne | curated | 2 | 2 | 2 | 2 | 0 | 0 | 4218 | ok |
| meetup:big-data-developers-in-berlin | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 8165 | ok |
| meetup:ibmpoweraifrankfurt | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 8032 | ok |
| meetup:big-data-developers-in-munich | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 7981 | ok |
| meetup:ibm-powerai-dusseldorf | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 8027 | ok |
| meetup:jug-hamburg | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7523 | ok |
| meetup:main-valley | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 7945 | ok |
| meetup:give-a-go | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7710 | ok |
| meetup:berlinbanktechnights | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8080 | ok |
| meetup:frontend-meetup-freiburg | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 7973 | ok |
| meetup:opentechschool-leipzig | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8020 | ok |
| meetup:rewe-digital-events-cologne | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8098 | ok |
| meetup:godot-stammtisch-karlsruhe | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:azure-serverless-koln | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:the-test-tribe-frankfurt-meetup | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 0 | ok |
| meetup:ai-professionals-munich | curated | 1 | 1 | 1 | 1 | 0 | 0 | 2234 | ok |
| meetup:munich-datageeks | curated | 1 | 1 | 1 | 1 | 1 | 0 | 3309 | ok |
| meetup:hamburg-data-science-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8019 | ok |
| meetup:clickhouse-meetup-munich | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8029 | ok |
| meetup:berlinai | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8132 | ok |
| meetup:ai-agents-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7894 | ok |
| meetup:agentic-ai-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7830 | ok |
| meetup:sovereign-ai-meetup-ulm | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7860 | ok |
| meetup:bonner-ki-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7973 | ok |
| meetup:ai-school-leipzig | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8000 | ok |
| meetup:ai-cloud-innovation-karlsruhe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7969 | ok |
| meetup:kassel-data-science-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7759 | ok |
| meetup:artificial-intelligence-meetup-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8049 | ok |
| meetup:heidelberg-knowledge-graph-ai-hub | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7996 | ok |
| meetup:munich-snowflake-data-cloud-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8099 | ok |
| meetup:beads-berlin-ecosystem-for-analytics-and-data-systems | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8033 | ok |
| meetup:pass-microsoft-data-platform-usergroup-rheinland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7829 | ok |
| meetup:awsughh | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8025 | ok |
| meetup:fra_aws | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8030 | ok |
| meetup:ai-transformation-camp | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7969 | ok |
| meetup:pydata-munchen | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 209 | ok |
| meetup:grafana-friends-frankfurt | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 1030 | ok |
| meetup:producttank-nuernberg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 1776 | ok |
| meetup:tech-talk-stuttgart | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 2766 | ok |
| meetup:owasp-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 4594 | ok |
| meetup:wtm-berlin | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 5003 | ok |
| meetup:producttank-munich | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 5531 | ok |
| meetup:azure-dusseldorf-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 5967 | ok |
| meetup:openmates-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6520 | ok |
| meetup:inovex-meetup-erlangen | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7012 | ok |
| meetup:cybercologne-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8010 | ok |
| meetup:azure-bonn-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7799 | ok |
| meetup:gdg-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7759 | ok |
| meetup:net-user-group-karlsruhe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7889 | ok |
| meetup:isaqb-software-architektur-meetup-gruppe-fur-interessierte | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8080 | ok |
| meetup:django-cologne | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7906 | ok |
| meetup:mannheim-java-usergroup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7943 | ok |
| meetup:pass-usergroup-rhein-main | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8029 | ok |
| meetup:bochum-meetup-and-explore-the-community-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7955 | ok |
| meetup:hamburger-indie-treff | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7984 | ok |
| meetup:google-developers-group-munster | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7917 | ok |
| meetup:wpmeetup-potsdam | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7989 | ok |
| meetup:checkmk-munich-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7964 | ok |
| meetup:devtalk-tk | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7844 | ok |
| meetup:womentechmakershamburg | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8008 | ok |
| meetup:meetup-group-pnulfhzz | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7997 | ok |
| meetup:prodot-insights | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7770 | ok |
| meetup:padagility | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7969 | ok |
| meetup:cloud-native-munster | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8044 | ok |
| meetup:meetup-group-igafblfy | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8024 | ok |
| meetup:meetup-group-tfyvuydp | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7985 | ok |
| meetup:cloud-native-night | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7982 | ok |
| meetup:leipzig-golang | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8008 | ok |
| meetup:nordic-coding | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7952 | ok |
| meetup:node-code-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7913 | ok |
| meetup:rust-dortmund | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7934 | ok |
| meetup:jug-nurnberg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7995 | ok |
| meetup:le-software-craft-community | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7984 | ok |
| meetup:tech-talk-muenster | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8006 | ok |
| meetup:opensource-ruhr | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8050 | ok |
| meetup:scrum-user-group-karlsruhe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7875 | ok |
| meetup:berlincplusplus | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8051 | ok |
| meetup:llvm-social-darmstadt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7970 | ok |
| meetup:lean-coffee-karlsruhe-frankfurt | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8028 | ok |
| meetup:aws-user-group-bergstrasse | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8013 | ok |
| meetup:modern-work-munster | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8037 | ok |
| meetup:leaddev-meetup-munich | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7961 | ok |
| meetup:gemeinsam-mit-ki-koeln | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7987 | ok |
| meetup:php-user-group-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7951 | ok |
| meetup:elixir-ruhr-dev | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7912 | ok |
| meetup:owasp-cologne-chapter | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7859 | ok |
| meetup:lean-agile-sh | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8027 | ok |
| meetup:bochum-network-security-meetup-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:tech-meetup-sauerland | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:hack-the-box-meetup-leipzig-de | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:tech-talk-karlsruhe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:berlin-amazon-web-services-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:hackergarten-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:leaddev-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:audio-developer-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:opencoffeeclub_hamburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:robot-framework-usergroup-munsterland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:main-kinzig-nerds | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:rust-rhein-main | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:quality-engineering-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:do-dotnet | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:bergisches-entwicklerforum | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:cto-roundtable-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:tubingen-postgresql-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:42-shades-of-it | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:devops-freiburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:afterwork-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:react-berlin-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:webmontag-kassel | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:hannovr | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:cybersecurity-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:aws-user-group-bodensee | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:erfurt-wordpress-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:cyberforum-e-v-karlsruhe-hightech-unternehmer-netzwerk | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:auditing-ai-beyond-the-prompt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:dortmund-aws-user-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:aws-usergroup-munsterland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:digitalhubms | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:phpug-rhein-neckar | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:codecentric-dortmund-tech-talk | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:docker-black-forest | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:ddd-muc | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:php-usergroup-dresden | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:aachen-maker-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:ccdd-conciso-coding-dojo-dortmund | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:data-ai-meetup-koln | curated | 0 | 0 | 0 | 0 | 0 | 0 | 6239 | empty |
| meetup:data-visualization-meetup-hamburg | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7187 | empty |
| meetup:berlin-computer-vision-group | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7810 | empty |
| meetup:berlin-women-in-machine-learning-and-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7984 | empty |
| meetup:kaggle-berlin | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7984 | empty |
| meetup:data-science-and-ai-frankfurt | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7884 | empty |
| meetup:applydata-munich | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7857 | empty |
| eventbrite-berlin | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 67 | FAILED: HTTP 429 |
| eventbrite-munich | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 966 | FAILED: HTTP 429 |
| eventbrite-cologne | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 1964 | FAILED: HTTP 429 |
| eventbrite-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 2290 | FAILED: HTTP 429 |
| eventbrite-hamburg | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 3001 | FAILED: HTTP 429 |
| eventbrite-stuttgart | noisy | 0 | 0 | 0 | 0 | 0 | 1 | 3939 | FAILED: HTTP 429 |
| aieventlist-stuttgart | curated | 0 | 0 | 0 | 0 | 0 | 0 | 4998 | empty |
| startupcity-hamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 199 | empty |

## Scrape sources

| source | status | text chars | links | detail |
| --- | --- | --- | --- | --- |
| scrape:ki-verband-community | skipped |  |  | js: true (Playwright arrives later) |
| scrape:cyber-valley | skipped |  |  | js: true (Playwright arrives later) |
| scrape:scads | skipped |  |  | js: true (Playwright arrives later) |
| scrape:mpg | skipped |  |  | js: true (Playwright arrives later) |
| scrape:techquartier | skipped |  |  | js: true (Playwright arrives later) |
| scrape:ki-verband-events | deferred |  |  | cap of 4 pages per run |
| scrape:bitkom | deferred |  |  | cap of 4 pages per run |
| scrape:bifold | deferred |  |  | cap of 4 pages per run |
| scrape:lamarr | deferred |  |  | cap of 4 pages per run |
| scrape:appliedai | deferred |  |  | cap of 4 pages per run |
| scrape:ellis | deferred |  |  | cap of 4 pages per run |
| scrape:ellis-tuebingen | deferred |  |  | cap of 4 pages per run |
| scrape:tum-mdsi | deferred |  |  | cap of 4 pages per run |
| scrape:tu-berlin | deferred |  |  | cap of 4 pages per run |
| scrape:hpi | deferred |  |  | cap of 4 pages per run |
| scrape:kit | deferred |  |  | cap of 4 pages per run |
| scrape:helmholtz-ai | deferred |  |  | cap of 4 pages per run |
| scrape:fraunhofer | deferred |  |  | cap of 4 pages per run |
| scrape:gi | deferred |  |  | cap of 4 pages per run |
| scrape:gi-fb-ki | deferred |  |  | cap of 4 pages per run |
| scrape:ai-hub-lmu | deferred |  |  | cap of 4 pages per run |
| scrape:unternehmertum | deferred |  |  | cap of 4 pages per run |
| scrape:nextmedia-hamburg | deferred |  |  | cap of 4 pages per run |
| scrape:starthub-hessen | deferred |  |  | cap of 4 pages per run |
| scrape:startplatz | deferred |  |  | cap of 4 pages per run |
| scrape:startup-region-stuttgart | deferred |  |  | cap of 4 pages per run |
| scrape:it-region-stuttgart | deferred |  |  | cap of 4 pages per run |
| scrape:aitinkerers-berlin | deferred |  |  | cap of 4 pages per run |
| scrape:aitinkerers-munich | deferred |  |  | cap of 4 pages per run |
| scrape:aitinkerers-hamburg | deferred |  |  | cap of 4 pages per run |
| scrape:allai | ready | 20389 | 36 |  |
| scrape:frankeundschwarz | ready | 32000 | 809 |  |
| scrape:eventseye | ready | 32000 | 249 |  |
| scrape:conferenceindex | ready | 13872 | 64 |  |

## Per city (after dedupe)

| city group | clusters | known | new |
| --- | --- | --- | --- |
| Berlin | 88 | 0 | 88 |
| Other Germany | 75 | 0 | 75 |
| Munich | 47 | 0 | 47 |
| Hamburg | 43 | 0 | 43 |
| Frankfurt | 28 | 0 | 28 |
| Cologne | 22 | 0 | 22 |
| Unknown | 20 | 0 | 20 |
| Online (DE) | 9 | 0 | 9 |
| Stuttgart | 8 | 0 | 8 |

Places inside "Other Germany" (after dedupe): Nuremberg 15, Münster 6, Leipzig 6, Hanover 6, Karlsruhe 5, Warendorf 5, Heidelberg 4, Freiburg 4, Kiel 2, Dortmund 2, Essen 2, Chemnitz 2, Fürth 1, Kassel 1, Königswinter 1

## Dropped by filters (all sources)

| reason | count |
| --- | --- |
| country | 801 |
| keyword | 500 |
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

- eventbrite-berlin: FAILED (HTTP 429)
- eventbrite-munich: FAILED (HTTP 429)
- eventbrite-cologne: FAILED (HTTP 429)
- eventbrite-frankfurt: FAILED (HTTP 429)
- eventbrite-hamburg: FAILED (HTTP 429)
- eventbrite-stuttgart: FAILED (HTTP 429)
- meetup:data-ai-meetup-koln: empty (0 items)
- meetup:data-visualization-meetup-hamburg: empty (0 items)
- meetup:berlin-computer-vision-group: empty (0 items)
- meetup:berlin-women-in-machine-learning-and-data-science: empty (0 items)
- meetup:kaggle-berlin: empty (0 items)
- meetup:data-science-and-ai-frankfurt: empty (0 items)
- meetup:applydata-munich: empty (0 items)
- aieventlist-stuttgart: empty (0 items)
- startupcity-hamburg: empty (0 items, 30 raw) - feed items carry no event date (pubDate is the publish date); needs a per-page fetch

## Meetup group discovery

- bochum-network-security-meetup-group: ICS ok
- tech-meetup-sauerland: ICS ok
- hack-the-box-meetup-leipzig-de: ICS ok
- java-user-group-hannover: ICS ok
- hannover-python-meetup: ICS ok
- godot-stammtisch-karlsruhe: ICS ok
- tech-talk-karlsruhe: ICS ok
- berlin-amazon-web-services-meetup-group: ICS ok
- hackergarten-stuttgart: ICS ok
- leaddev-meetup-berlin: ICS ok
- azure-serverless-koln: ICS ok
- audio-developer-meetup-berlin: ICS ok
- leipzig-wordpress-meetup: ICS ok
- code-for-munster: ICS ok
- opencoffeeclub_hamburg: ICS ok
- robot-framework-usergroup-munsterland: ICS ok
- the-test-tribe-frankfurt-meetup: ICS ok
- bitcoinkarlsruhe: ICS ok
- main-kinzig-nerds: ICS ok
- decentralized-trust-ruhrgebiet: ICS ok
- rust-rhein-main: ICS ok
- quality-engineering-berlin: ICS ok
- do-dotnet: ICS ok
- bergisches-entwicklerforum: ICS ok
- cto-roundtable-berlin: ICS ok
- spawnpoint: ICS ok
- gdg-nuremberg: ICS ok
- tubingen-postgresql-meetup-group: ICS ok
- 42-shades-of-it: ICS ok
- softwerkskammer-luebeck: ICS ok
- devops-freiburg: ICS ok
- afterwork-meetup-berlin: ICS ok
- react-berlin-meetup: ICS ok
- webmontag-kassel: ICS ok
- hannovr: ICS ok
- cybersecurity-stuttgart: ICS ok
- aws-user-group-bodensee: ICS ok
- gamedevtreff-ruhrpott: ICS ok
- erfurt-wordpress-meetup: ICS ok
- cyberforum-e-v-karlsruhe-hightech-unternehmer-netzwerk: ICS ok
- kubernetes-meetup-bielefeld: ICS ok
- auditing-ai-beyond-the-prompt: ICS ok
- wpmeetup-stuttgart: ICS ok
- dortmund-aws-user-group: ICS ok
- aws-usergroup-munsterland: ICS ok
- digitalhubms: ICS ok
- phpug-rhein-neckar: ICS ok
- chiemseebitcoinandblockchainmeetup: ICS ok
- gamedevmuc: ICS ok
- codecentric-dortmund-tech-talk: ICS ok
- docker-black-forest: ICS ok
- it-security-kassel: ICS ok
- ddd-muc: ICS ok
- php-usergroup-dresden: ICS ok
- aachen-maker-meetup: ICS ok
- berlin-wordpress-meetup: ICS ok
- ccdd-conciso-coding-dojo-dortmund: ICS ok
- ksug-in: ICS ok

## Notes

- Ledger/ health/ cache files written; elapsed 181 s.
- Bootstrap: 6 chunk(s) of up to 60 under work/chunk-NN/.
