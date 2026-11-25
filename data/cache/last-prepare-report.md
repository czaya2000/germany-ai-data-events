# Prepare run report

- Date: 2026-11-25 (window 120 days), mode: daily
- Feed sources: 234/234 reachable (100%), 6 disabled
- Totals: fetched 2274, in-window German 1111, after keyword filter 577, after dedupe 349, known 343, new 6, sent to Claude 6, deferred by cap 0
- Ledger: 1130 entries, 0 pruned

## Per source (feed)

Columns: fetched = items parsed and normalised; in-window DE = passed country, window, cancelled and duration checks; kept = also passed the keyword filter; dedupe = clusters the source took part in; primary = clusters whose best record came from this source.

| source | trust | fetched | in-window DE | kept | dedupe | primary | errors | ms | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agentconfs | curated | 544 | 11 | 11 | 11 | 7 | 0 | 247 | ok |
| brainberg | noisy | 322 | 249 | 99 | 96 | 16 | 0 | 3998 | ok |
| hackevents-ai | noisy | 215 | 190 | 161 | 157 | 93 | 0 | 651 | ok |
| aieventlist-europe | curated | 179 | 22 | 22 | 22 | 10 | 0 | 1090 | ok |
| confstech | noisy | 138 | 2 | 0 | 0 | 0 | 0 | 1066 | ok |
| deutschlandki | curated | 58 | 17 | 17 | 17 | 17 | 0 | 490 | ok |
| hackevents-data | noisy | 57 | 49 | 41 | 41 | 8 | 0 | 570 | ok |
| luma-berlin | noisy | 55 | 55 | 9 | 9 | 9 | 0 | 1190 | ok |
| bwcon | noisy | 23 | 15 | 6 | 6 | 6 | 0 | 852 | ok |
| luma-munich | noisy | 20 | 20 | 4 | 4 | 4 | 0 | 1331 | ok |
| lmu | noisy | 20 | 15 | 0 | 0 | 0 | 0 | 1434 | ok |
| devevents | noisy | 19 | 4 | 1 | 1 | 1 | 0 | 276 | ok |
| luma-hamburg | noisy | 18 | 18 | 2 | 2 | 2 | 0 | 1877 | ok |
| aieventlist-berlin | curated | 17 | 7 | 7 | 7 | 3 | 0 | 1690 | ok |
| aieventlist-munich | curated | 14 | 11 | 11 | 11 | 9 | 0 | 2130 | ok |
| meetup:ai-beavers | noisy | 10 | 10 | 10 | 10 | 10 | 0 | 8155 | ok |
| luma-frankfurt | noisy | 10 | 10 | 2 | 2 | 1 | 0 | 2294 | ok |
| caiml | curated | 10 | 0 | 0 | 0 | 0 | 0 | 726 | ok |
| meetup:jug-bb | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 3850 | ok |
| meetup:silicon-allee-events | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8316 | ok |
| meetup:stuttgart-industrie-4-0-und-iot-meetup | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 8146 | ok |
| meetup:heidelberg-makers-meetup | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8171 | ok |
| meetup:game-developers-berlin | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8134 | ok |
| meetup:unternehmer-startups-meetup-rosenheim | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8184 | ok |
| meetup:uxchange | noisy | 10 | 5 | 0 | 0 | 0 | 0 | 8128 | ok |
| meetup:rosenheim-bitcoin-stammtisch | noisy | 10 | 5 | 0 | 0 | 0 | 0 | 7792 | ok |
| meetup:java-user-group-hannover | noisy | 10 | 3 | 3 | 3 | 3 | 0 | 8041 | ok |
| meetup:leipzig-wordpress-meetup | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 8076 | ok |
| meetup:bitcoinkarlsruhe | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8199 | ok |
| meetup:softwerkskammer-luebeck | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8072 | ok |
| meetup:kubernetes-meetup-bielefeld | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8141 | ok |
| meetup:wpmeetup-stuttgart | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8146 | ok |
| meetup:chiemseebitcoinandblockchainmeetup | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8184 | ok |
| meetup:gamedevmuc | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8129 | ok |
| meetup:berlin-wordpress-meetup | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8067 | ok |
| meetup:makercube | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8100 | ok |
| meetup:rust-berlin | noisy | 10 | 10 | 8 | 8 | 8 | 0 | 8205 | ok |
| meetup:aibuildersclub | noisy | 10 | 10 | 10 | 8 | 8 | 0 | 8502 | ok |
| meetup:leipzig-python-user-group | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 8211 | ok |
| meetup:pycologne | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 8087 | ok |
| meetup:freifunk-oberhausen | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8071 | ok |
| meetup:dresdenjs-io-javascript-user-group | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 7725 | ok |
| meetup:lalug-landshuter-linux-user-group-stammtisch | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8036 | ok |
| meetup:emerging-tech-rhein-main-community | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:betreute-intelligenz | curated | 9 | 5 | 5 | 5 | 5 | 0 | 8189 | ok |
| meetup:decentralized-trust-ruhrgebiet | noisy | 9 | 9 | 3 | 3 | 3 | 0 | 8214 | ok |
| meetup:munchen-ai-machine-learning-and-computer-vision-meetup | curated | 8 | 8 | 7 | 7 | 7 | 0 | 4589 | ok |
| meetup:muenster-macht-agil | noisy | 8 | 8 | 0 | 0 | 0 | 0 | 8166 | ok |
| meetup:pirateskills | curated | 7 | 4 | 4 | 4 | 4 | 0 | 8156 | ok |
| hessian-ai | curated | 7 | 7 | 6 | 6 | 6 | 0 | 1027 | ok |
| meetup:ibm-developers | noisy | 7 | 7 | 7 | 2 | 0 | 0 | 8106 | ok |
| meetup:bliss-speaker-series | curated | 6 | 6 | 6 | 6 | 6 | 0 | 8163 | ok |
| aieventlist-frankfurt | curated | 6 | 3 | 3 | 3 | 1 | 0 | 2893 | ok |
| mcml | curated | 5 | 5 | 4 | 4 | 4 | 0 | 827 | ok |
| gfw-warendorf | curated | 5 | 5 | 3 | 3 | 3 | 0 | 1457 | ok |
| meetup:berlin-software-engineering-leadership-meetup-group | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 8215 | ok |
| meetup:spawnpoint | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 7843 | ok |
| meetup:startup-factory-boost-network | noisy | 4 | 4 | 0 | 0 | 0 | 0 | 8017 | ok |
| meetup:hannover-unity-meetup | noisy | 4 | 4 | 0 | 0 | 0 | 0 | 8084 | ok |
| meetup:code-for-munster | noisy | 4 | 4 | 0 | 0 | 0 | 0 | 7994 | ok |
| meetup:maikers-ai-community | curated | 3 | 3 | 3 | 3 | 3 | 0 | 7989 | ok |
| meetup:ai-nights-nurnberg | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8055 | ok |
| meetup:liberating-structures-user-group-rhein-main | noisy | 3 | 1 | 0 | 0 | 0 | 0 | 8104 | ok |
| meetup:node-code-frankfurt | noisy | 3 | 3 | 1 | 1 | 1 | 0 | 7914 | ok |
| meetup:berlindroid | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8104 | ok |
| meetup:gdg-nuremberg | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8036 | ok |
| meetup:gamedevtreff-ruhrpott | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 7920 | ok |
| meetup:it-security-kassel | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8038 | ok |
| meetup:pydata-berlin | curated | 2 | 2 | 2 | 2 | 2 | 0 | 373 | ok |
| meetup:pydata-hamburg | curated | 2 | 2 | 2 | 2 | 1 | 0 | 1185 | ok |
| meetup:ibmpoweraiberlin | curated | 2 | 2 | 2 | 2 | 2 | 0 | 5228 | ok |
| meetup:ai-agenten-frankfurt | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8054 | ok |
| aieventlist-hamburg | curated | 2 | 1 | 1 | 1 | 1 | 0 | 3729 | ok |
| meetup:big-data-developers-in-berlin | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 7953 | ok |
| meetup:ibmpoweraifrankfurt | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 8081 | ok |
| meetup:big-data-developers-in-munich | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 7912 | ok |
| meetup:ibm-powerai-dusseldorf | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 7928 | ok |
| meetup:jug-hamburg | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7577 | ok |
| meetup:main-valley | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8086 | ok |
| meetup:digital-craftsmanship-nordoberpfalz | noisy | 2 | 1 | 1 | 1 | 1 | 0 | 7848 | ok |
| meetup:berlinbanktechnights | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8072 | ok |
| meetup:frontend-meetup-freiburg | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8069 | ok |
| meetup:opentechschool-leipzig | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8077 | ok |
| meetup:rewe-digital-events-cologne | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7975 | ok |
| meetup:hannover-python-meetup | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 7995 | ok |
| meetup:godot-stammtisch-karlsruhe | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7951 | ok |
| meetup:azure-serverless-koln | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8016 | ok |
| meetup:the-test-tribe-frankfurt-meetup | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8082 | ok |
| meetup:rethinking-ai-at-work | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 7798 | ok |
| meetup:cologne-js | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7937 | ok |
| meetup:ai-professionals-munich | curated | 1 | 1 | 1 | 1 | 0 | 0 | 2170 | ok |
| meetup:munich-datageeks | curated | 1 | 1 | 1 | 1 | 1 | 0 | 3194 | ok |
| meetup:hamburg-data-science-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7980 | ok |
| meetup:clickhouse-meetup-munich | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8010 | ok |
| meetup:berlinai | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7976 | ok |
| meetup:ai-agents-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7885 | ok |
| meetup:agentic-ai-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7779 | ok |
| meetup:bonner-ki-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7936 | ok |
| meetup:ai-school-leipzig | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7992 | ok |
| meetup:ai-cloud-innovation-karlsruhe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8086 | ok |
| meetup:kassel-data-science-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7990 | ok |
| meetup:artificial-intelligence-meetup-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7987 | ok |
| meetup:heidelberg-knowledge-graph-ai-hub | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7993 | ok |
| meetup:munich-snowflake-data-cloud-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8111 | ok |
| meetup:beads-berlin-ecosystem-for-analytics-and-data-systems | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7996 | ok |
| meetup:pass-microsoft-data-platform-usergroup-rheinland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7719 | ok |
| meetup:awsughh | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7991 | ok |
| meetup:fra_aws | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7923 | ok |
| meetup:prompting-lab | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8001 | ok |
| meetup:ai-transformation-camp | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7952 | ok |
| aieventlist-cologne | curated | 1 | 1 | 1 | 1 | 0 | 0 | 4614 | ok |
| aieventlist-stuttgart | curated | 1 | 1 | 1 | 1 | 1 | 0 | 5224 | ok |
| meetup:pydata-munchen | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 419 | ok |
| meetup:grafana-friends-frankfurt | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 1609 | ok |
| meetup:owasp-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 4556 | ok |
| meetup:wtm-berlin | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 4779 | ok |
| meetup:producttank-munich | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 5790 | ok |
| meetup:azure-dusseldorf-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6069 | ok |
| meetup:openmates-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6851 | ok |
| meetup:inovex-meetup-erlangen | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6989 | ok |
| meetup:cybercologne-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7992 | ok |
| meetup:azure-bonn-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7936 | ok |
| meetup:gdg-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7954 | ok |
| meetup:net-user-group-karlsruhe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7957 | ok |
| meetup:isaqb-software-architektur-meetup-gruppe-fur-interessierte | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8010 | ok |
| meetup:mannheim-java-usergroup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8042 | ok |
| meetup:pass-usergroup-rhein-main | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8014 | ok |
| meetup:give-a-go | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7907 | ok |
| meetup:padagility | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7942 | ok |
| meetup:nordic-coding | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8123 | ok |
| meetup:rust-dortmund | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7953 | ok |
| meetup:jug-nurnberg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8205 | ok |
| meetup:le-software-craft-community | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8029 | ok |
| meetup:tech-talk-muenster | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7978 | ok |
| meetup:opensource-ruhr | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7909 | ok |
| meetup:scrum-user-group-karlsruhe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7800 | ok |
| meetup:berlincplusplus | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8223 | ok |
| meetup:llvm-social-darmstadt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7786 | ok |
| meetup:lean-coffee-karlsruhe-frankfurt | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7977 | ok |
| meetup:aws-user-group-bergstrasse | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8025 | ok |
| meetup:modern-work-munster | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8133 | ok |
| meetup:leaddev-meetup-munich | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8243 | ok |
| meetup:gemeinsam-mit-ki-koeln | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7831 | ok |
| meetup:php-user-group-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7944 | ok |
| meetup:elixir-ruhr-dev | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7878 | ok |
| meetup:owasp-cologne-chapter | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7832 | ok |
| meetup:lean-agile-sh | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8074 | ok |
| meetup:bochum-network-security-meetup-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7948 | ok |
| meetup:tech-meetup-sauerland | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8007 | ok |
| meetup:hack-the-box-meetup-leipzig-de | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7979 | ok |
| meetup:tech-talk-karlsruhe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7925 | ok |
| meetup:berlin-amazon-web-services-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7974 | ok |
| meetup:hackergarten-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8000 | ok |
| meetup:leaddev-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8030 | ok |
| meetup:audio-developer-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7899 | ok |
| meetup:opencoffeeclub_hamburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7927 | ok |
| meetup:robot-framework-usergroup-munsterland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7988 | ok |
| meetup:main-kinzig-nerds | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8037 | ok |
| meetup:rust-rhein-main | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7953 | ok |
| meetup:quality-engineering-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7991 | ok |
| meetup:do-dotnet | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8041 | ok |
| meetup:bergisches-entwicklerforum | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7887 | ok |
| meetup:cto-roundtable-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7922 | ok |
| meetup:tubingen-postgresql-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7794 | ok |
| meetup:42-shades-of-it | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8030 | ok |
| meetup:devops-freiburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7985 | ok |
| meetup:afterwork-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8282 | ok |
| meetup:react-berlin-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7964 | ok |
| meetup:webmontag-kassel | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7918 | ok |
| meetup:hannovr | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7919 | ok |
| meetup:cybersecurity-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7955 | ok |
| meetup:aws-user-group-bodensee | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7985 | ok |
| meetup:erfurt-wordpress-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8008 | ok |
| meetup:cyberforum-e-v-karlsruhe-hightech-unternehmer-netzwerk | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7765 | ok |
| meetup:auditing-ai-beyond-the-prompt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7984 | ok |
| meetup:dortmund-aws-user-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8017 | ok |
| meetup:aws-usergroup-munsterland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7970 | ok |
| meetup:digitalhubms | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8013 | ok |
| meetup:phpug-rhein-neckar | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8002 | ok |
| meetup:codecentric-dortmund-tech-talk | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8010 | ok |
| meetup:docker-black-forest | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7886 | ok |
| meetup:ddd-muc | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8011 | ok |
| meetup:php-usergroup-dresden | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7958 | ok |
| meetup:aachen-maker-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7993 | ok |
| meetup:ccdd-conciso-coding-dojo-dortmund | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7729 | ok |
| meetup:ksug-in | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7991 | ok |
| meetup:berlinawsug | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7976 | ok |
| meetup:owasp-augsburg-chapter | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8014 | ok |
| meetup:tech-n-talk-frankfurt | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7962 | ok |
| meetup:software-technology-meetup-pforzheim | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8020 | ok |
| meetup:gdg-hannover | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8041 | ok |
| meetup:bonn-bitcoin-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7916 | ok |
| meetup:scrumtisch-bonn | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8022 | ok |
| meetup:domain-driven-design-rhein-main | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7969 | ok |
| meetup:webwirtschaft | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7518 | ok |
| meetup:claude-meetup-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8078 | ok |
| meetup:global-ai-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7945 | ok |
| meetup:bass-hb | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8013 | ok |
| meetup:gamecreatorscologne | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8074 | ok |
| meetup:health-ai-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8245 | ok |
| meetup:ki-klub-werder-havel | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8009 | ok |
| meetup:obi-tech-talks | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:ai-knowledge-worker-meetup-leipzig | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:big-data-and-ai-saxony | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:purple-elbe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:hamburg-powershell-user-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:azure-dev-munich | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 0 | ok |
| meetup:aws-user-group-mannheim | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:data-ai-meetup-koln | curated | 0 | 0 | 0 | 0 | 0 | 0 | 6184 | empty |
| meetup:data-visualization-meetup-hamburg | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7250 | empty |
| meetup:berlin-computer-vision-group | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7828 | empty |
| meetup:berlin-women-in-machine-learning-and-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8016 | empty |
| meetup:kaggle-berlin | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8103 | empty |
| meetup:data-science-and-ai-frankfurt | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8031 | empty |
| meetup:applydata-munich | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7578 | empty |
| meetup:sovereign-ai-meetup-ulm | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7812 | empty |
| eventbrite-berlin | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-munich | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-cologne | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-hamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-stuttgart | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| startupcity-hamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 1024 | empty |
| meetup:producttank-nuernberg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 2003 | empty |
| meetup:tech-talk-stuttgart | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 2877 | empty |
| meetup:django-cologne | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7844 | empty |
| meetup:bochum-meetup-and-explore-the-community-meetup-group | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7807 | empty |
| meetup:hamburger-indie-treff | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7777 | empty |
| meetup:google-developers-group-munster | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7899 | empty |
| meetup:wpmeetup-potsdam | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7949 | empty |
| meetup:checkmk-munich-group | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7986 | empty |
| meetup:devtalk-tk | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7776 | empty |
| meetup:womentechmakershamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7997 | empty |
| meetup:meetup-group-pnulfhzz | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8035 | empty |
| meetup:prodot-insights | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7918 | empty |
| meetup:cloud-native-munster | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8064 | empty |
| meetup:meetup-group-igafblfy | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8032 | empty |
| meetup:meetup-group-tfyvuydp | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7986 | empty |
| meetup:cloud-native-night | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7967 | empty |
| meetup:leipzig-golang | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8032 | empty |

## Scrape sources

| source | status | text chars | links | detail |
| --- | --- | --- | --- | --- |
| scrape:allai | not due |  |  | slot day 1 |
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
| scrape:mpg | skipped |  |  | js: true (Playwright arrives later) |
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
| scrape:fraunhofer | deferred |  |  | cap of 4 pages per run |
| scrape:gi | deferred |  |  | cap of 4 pages per run |
| scrape:gi-fb-ki | deferred |  |  | cap of 4 pages per run |
| scrape:ai-hub-lmu | deferred |  |  | cap of 4 pages per run |
| scrape:tu-berlin | skipped |  |  | robots.txt disallows this path |
| scrape:hpi | skipped |  |  | robots.txt disallows this path |
| scrape:kit | ready | 32000 | 113 |  |
| scrape:helmholtz-ai | skipped |  |  | robots.txt disallows this path |

## Per city (after dedupe)

| city group | clusters | known | new |
| --- | --- | --- | --- |
| Berlin | 94 | 92 | 2 |
| Other Germany | 71 | 68 | 3 |
| Munich | 52 | 51 | 1 |
| Hamburg | 38 | 38 | 0 |
| Unknown | 29 | 29 | 0 |
| Frankfurt | 28 | 28 | 0 |
| Cologne | 23 | 23 | 0 |
| Online (DE) | 8 | 8 | 0 |
| Stuttgart | 6 | 6 | 0 |

Places inside "Other Germany" (after dedupe): Nuremberg 13, Leipzig 12, Karlsruhe 5, Münster 5, Hanover 5, Heidelberg 4, Freiburg 4, Dortmund 4, Warendorf 4, Dresden 3, Chemnitz 3, Mannheim 2, Fürth 1, Kassel 1, Erlangen 1

## Dropped by filters (all sources)

| reason | count |
| --- | --- |
| country | 798 |
| keyword | 534 |
| window | 361 |
| long | 4 |

## 10 largest dedupe clusters

| members | title | sources |
| --- | --- | --- |
| 11 | IBM Bob Coding Watch Party in Berlin & Online | meetup:ibmpoweraiberlin, meetup:big-data-developers-in-berlin, meetup:ibmpoweraifrankfurt, meetup:ibm-developers, hackevents-ai, hackevents-data |
| 7 | AI Coding Summit Berlin | meetup:berlinai, agentconfs, brainberg, hackevents-ai, aieventlist-berlin, aieventlist-europe |
| 6 | AWS UG Frankfurt with Grafana UG: Keycloak SLIs & Traffic Data in Grafana | meetup:fra_aws, meetup:grafana-friends-frankfurt, hackevents-ai, hackevents-data, brainberg |
| 6 | DevFest Munich 2026 - Munich Innovates: AI, Cloud & Beyond | meetup:gdg-munich, brainberg, hackevents-ai, hackevents-data, aieventlist-munich, aieventlist-europe |
| 6 | DATA festival 2027 | deutschlandki, agentconfs, hackevents-ai, hackevents-data, aieventlist-munich, aieventlist-europe |
| 5 | ITCS Frankfurt - AI Stage | meetup:artificial-intelligence-meetup-frankfurt, hackevents-ai, brainberg, aieventlist-frankfurt, aieventlist-europe |
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
- meetup:sovereign-ai-meetup-ulm: empty (0 items)
- startupcity-hamburg: empty (0 items, 30 raw) - feed items carry no event date (pubDate is the publish date); needs a per-page fetch

## Meetup group discovery

- obi-tech-talks: ICS ok
- ai-knowledge-worker-meetup-leipzig: ICS ok
- big-data-and-ai-saxony: ICS ok
- purple-elbe: ICS ok
- hamburg-powershell-user-group: ICS ok
- azure-dev-munich: ICS ok
- emerging-tech-rhein-main-community: ICS ok
- aws-user-group-mannheim: ICS ok

## Notes

- Ledger/ health/ cache files written; elapsed 212 s.
