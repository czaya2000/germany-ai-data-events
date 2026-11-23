# Prepare run report

- Date: 2026-11-23 (window 120 days), mode: daily
- Feed sources: 226/226 reachable (100%), 6 disabled
- Totals: fetched 2307, in-window German 1159, after keyword filter 617, after dedupe 369, known 360, new 9, sent to Claude 9, deferred by cap 0
- Ledger: 1070 entries, 0 pruned

## Per source (feed)

Columns: fetched = items parsed and normalised; in-window DE = passed country, window, cancelled and duration checks; kept = also passed the keyword filter; dedupe = clusters the source took part in; primary = clusters whose best record came from this source.

| source | trust | fetched | in-window DE | kept | dedupe | primary | errors | ms | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agentconfs | curated | 544 | 12 | 12 | 12 | 7 | 0 | 212 | ok |
| brainberg | noisy | 335 | 264 | 108 | 105 | 16 | 0 | 3979 | ok |
| hackevents-ai | noisy | 231 | 208 | 175 | 171 | 103 | 0 | 586 | ok |
| aieventlist-europe | curated | 184 | 22 | 22 | 22 | 10 | 0 | 1226 | ok |
| confstech | noisy | 138 | 2 | 0 | 0 | 0 | 0 | 1147 | ok |
| hackevents-data | noisy | 59 | 51 | 45 | 45 | 8 | 0 | 659 | ok |
| luma-berlin | noisy | 50 | 50 | 6 | 6 | 6 | 0 | 140 | ok |
| deutschlandki | curated | 50 | 18 | 18 | 18 | 18 | 0 | 497 | ok |
| bwcon | noisy | 25 | 17 | 7 | 7 | 6 | 0 | 965 | ok |
| luma-munich | noisy | 22 | 22 | 5 | 5 | 5 | 0 | 934 | ok |
| luma-hamburg | noisy | 20 | 20 | 4 | 4 | 3 | 0 | 1215 | ok |
| lmu | noisy | 20 | 16 | 0 | 0 | 0 | 0 | 1334 | ok |
| devevents | noisy | 20 | 4 | 1 | 1 | 1 | 0 | 346 | ok |
| aieventlist-berlin | curated | 17 | 7 | 7 | 7 | 3 | 0 | 1329 | ok |
| aieventlist-munich | curated | 14 | 11 | 11 | 11 | 9 | 0 | 1801 | ok |
| luma-frankfurt | noisy | 11 | 11 | 2 | 2 | 1 | 0 | 1991 | ok |
| meetup:ai-beavers | noisy | 10 | 10 | 10 | 10 | 10 | 0 | 8112 | ok |
| caiml | curated | 10 | 0 | 0 | 0 | 0 | 0 | 774 | ok |
| meetup:jug-bb | noisy | 10 | 5 | 0 | 0 | 0 | 0 | 4069 | ok |
| meetup:silicon-allee-events | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8351 | ok |
| meetup:stuttgart-industrie-4-0-und-iot-meetup | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 8083 | ok |
| meetup:heidelberg-makers-meetup | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8233 | ok |
| meetup:game-developers-berlin | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8083 | ok |
| meetup:unternehmer-startups-meetup-rosenheim | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8030 | ok |
| meetup:uxchange | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8049 | ok |
| meetup:rosenheim-bitcoin-stammtisch | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8190 | ok |
| meetup:java-user-group-hannover | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 8068 | ok |
| meetup:leipzig-wordpress-meetup | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 8034 | ok |
| meetup:bitcoinkarlsruhe | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8136 | ok |
| meetup:softwerkskammer-luebeck | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8208 | ok |
| meetup:kubernetes-meetup-bielefeld | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8194 | ok |
| meetup:wpmeetup-stuttgart | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8138 | ok |
| meetup:chiemseebitcoinandblockchainmeetup | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8236 | ok |
| meetup:gamedevmuc | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8086 | ok |
| meetup:berlin-wordpress-meetup | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8059 | ok |
| meetup:makercube | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8175 | ok |
| meetup:rust-berlin | noisy | 10 | 10 | 8 | 8 | 8 | 0 | 8188 | ok |
| meetup:aibuildersclub | noisy | 10 | 10 | 10 | 8 | 8 | 0 | 8487 | ok |
| meetup:leipzig-python-user-group | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 7975 | ok |
| meetup:pycologne | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 8138 | ok |
| meetup:freifunk-oberhausen | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8157 | ok |
| meetup:dresdenjs-io-javascript-user-group | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:lalug-landshuter-linux-user-group-stammtisch | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:betreute-intelligenz | curated | 9 | 5 | 5 | 5 | 5 | 0 | 8172 | ok |
| meetup:muenster-macht-agil | noisy | 8 | 8 | 0 | 0 | 0 | 0 | 7953 | ok |
| meetup:decentralized-trust-ruhrgebiet | noisy | 8 | 8 | 3 | 3 | 3 | 0 | 8167 | ok |
| meetup:pirateskills | curated | 7 | 4 | 4 | 4 | 4 | 0 | 8203 | ok |
| hessian-ai | curated | 7 | 7 | 6 | 6 | 6 | 0 | 1292 | ok |
| meetup:ibm-developers | noisy | 7 | 7 | 7 | 2 | 0 | 0 | 8157 | ok |
| meetup:munchen-ai-machine-learning-and-computer-vision-meetup | curated | 6 | 6 | 5 | 5 | 5 | 0 | 4462 | ok |
| meetup:bliss-speaker-series | curated | 6 | 6 | 6 | 6 | 6 | 0 | 8187 | ok |
| mcml | curated | 6 | 6 | 4 | 4 | 4 | 0 | 1392 | ok |
| aieventlist-frankfurt | curated | 6 | 3 | 3 | 3 | 1 | 0 | 2762 | ok |
| gfw-warendorf | curated | 6 | 6 | 4 | 4 | 4 | 0 | 1649 | ok |
| meetup:berlin-software-engineering-leadership-meetup-group | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 8025 | ok |
| meetup:startup-factory-boost-network | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 8169 | ok |
| meetup:spawnpoint | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 7935 | ok |
| meetup:ai-nights-nurnberg | curated | 4 | 4 | 4 | 4 | 4 | 0 | 8210 | ok |
| meetup:hannover-unity-meetup | noisy | 4 | 4 | 0 | 0 | 0 | 0 | 8016 | ok |
| meetup:liberating-structures-user-group-rhein-main | noisy | 4 | 2 | 0 | 0 | 0 | 0 | 8054 | ok |
| meetup:code-for-munster | noisy | 4 | 4 | 0 | 0 | 0 | 0 | 7687 | ok |
| meetup:maikers-ai-community | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8279 | ok |
| aieventlist-hamburg | curated | 3 | 2 | 2 | 2 | 1 | 0 | 3698 | ok |
| meetup:digital-craftsmanship-nordoberpfalz | noisy | 3 | 2 | 2 | 2 | 2 | 0 | 7884 | ok |
| meetup:node-code-frankfurt | noisy | 3 | 3 | 1 | 1 | 1 | 0 | 7988 | ok |
| meetup:berlindroid | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8154 | ok |
| meetup:hannover-python-meetup | noisy | 3 | 3 | 3 | 3 | 3 | 0 | 8030 | ok |
| meetup:gdg-nuremberg | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8229 | ok |
| meetup:gamedevtreff-ruhrpott | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 7837 | ok |
| meetup:it-security-kassel | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8077 | ok |
| meetup:pydata-berlin | curated | 2 | 2 | 2 | 2 | 2 | 0 | 277 | ok |
| meetup:pydata-hamburg | curated | 2 | 2 | 2 | 2 | 1 | 0 | 1235 | ok |
| meetup:ibmpoweraiberlin | curated | 2 | 2 | 2 | 2 | 2 | 0 | 5238 | ok |
| meetup:ai-agenten-frankfurt | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8217 | ok |
| meetup:big-data-developers-in-berlin | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 7998 | ok |
| meetup:ibmpoweraifrankfurt | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 7999 | ok |
| meetup:big-data-developers-in-munich | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 7935 | ok |
| meetup:ibm-powerai-dusseldorf | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 7898 | ok |
| meetup:jug-hamburg | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7707 | ok |
| meetup:main-valley | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 7818 | ok |
| meetup:padagility | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8072 | ok |
| meetup:berlinbanktechnights | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 7984 | ok |
| meetup:frontend-meetup-freiburg | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8342 | ok |
| meetup:opentechschool-leipzig | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8070 | ok |
| meetup:rewe-digital-events-cologne | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8073 | ok |
| meetup:godot-stammtisch-karlsruhe | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8276 | ok |
| meetup:azure-serverless-koln | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8025 | ok |
| meetup:the-test-tribe-frankfurt-meetup | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8073 | ok |
| meetup:ksug-in | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8058 | ok |
| meetup:rethinking-ai-at-work | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 7690 | ok |
| meetup:cologne-js | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7799 | ok |
| meetup:ai-professionals-munich | curated | 1 | 1 | 1 | 1 | 0 | 0 | 2193 | ok |
| meetup:munich-datageeks | curated | 1 | 1 | 1 | 1 | 1 | 0 | 3235 | ok |
| meetup:hamburg-data-science-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8010 | ok |
| meetup:clickhouse-meetup-munich | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8254 | ok |
| meetup:berlinai | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7777 | ok |
| meetup:ai-agents-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7845 | ok |
| meetup:agentic-ai-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7804 | ok |
| meetup:sovereign-ai-meetup-ulm | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7837 | ok |
| meetup:bonner-ki-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7829 | ok |
| meetup:ai-school-leipzig | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7981 | ok |
| meetup:ai-cloud-innovation-karlsruhe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7856 | ok |
| meetup:kassel-data-science-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7977 | ok |
| meetup:artificial-intelligence-meetup-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7995 | ok |
| meetup:heidelberg-knowledge-graph-ai-hub | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7987 | ok |
| meetup:munich-snowflake-data-cloud-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7991 | ok |
| meetup:beads-berlin-ecosystem-for-analytics-and-data-systems | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8087 | ok |
| meetup:pass-microsoft-data-platform-usergroup-rheinland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7802 | ok |
| meetup:awsughh | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8107 | ok |
| meetup:fra_aws | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7984 | ok |
| meetup:prompting-lab | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7925 | ok |
| aieventlist-cologne | curated | 1 | 1 | 1 | 1 | 0 | 0 | 4391 | ok |
| aieventlist-stuttgart | curated | 1 | 1 | 1 | 1 | 1 | 0 | 4968 | ok |
| meetup:pydata-munchen | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 545 | ok |
| meetup:grafana-friends-frankfurt | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 1492 | ok |
| meetup:producttank-nuernberg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 2191 | ok |
| meetup:tech-talk-stuttgart | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 3072 | ok |
| meetup:owasp-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 4555 | ok |
| meetup:wtm-berlin | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 5256 | ok |
| meetup:producttank-munich | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 6072 | ok |
| meetup:azure-dusseldorf-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6313 | ok |
| meetup:openmates-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7005 | ok |
| meetup:inovex-meetup-erlangen | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7182 | ok |
| meetup:cybercologne-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8006 | ok |
| meetup:azure-bonn-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8106 | ok |
| meetup:gdg-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7953 | ok |
| meetup:net-user-group-karlsruhe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8009 | ok |
| meetup:isaqb-software-architektur-meetup-gruppe-fur-interessierte | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7990 | ok |
| meetup:django-cologne | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7931 | ok |
| meetup:mannheim-java-usergroup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8095 | ok |
| meetup:pass-usergroup-rhein-main | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7967 | ok |
| meetup:give-a-go | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7974 | ok |
| meetup:checkmk-munich-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7996 | ok |
| meetup:devtalk-tk | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7774 | ok |
| meetup:womentechmakershamburg | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8024 | ok |
| meetup:meetup-group-pnulfhzz | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8254 | ok |
| meetup:prodot-insights | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7861 | ok |
| meetup:cloud-native-munster | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8094 | ok |
| meetup:meetup-group-igafblfy | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7974 | ok |
| meetup:meetup-group-tfyvuydp | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7966 | ok |
| meetup:cloud-native-night | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7821 | ok |
| meetup:nordic-coding | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7884 | ok |
| meetup:rust-dortmund | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8004 | ok |
| meetup:jug-nurnberg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8283 | ok |
| meetup:le-software-craft-community | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8037 | ok |
| meetup:tech-talk-muenster | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8035 | ok |
| meetup:opensource-ruhr | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8180 | ok |
| meetup:scrum-user-group-karlsruhe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7896 | ok |
| meetup:berlincplusplus | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7915 | ok |
| meetup:llvm-social-darmstadt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7729 | ok |
| meetup:lean-coffee-karlsruhe-frankfurt | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7895 | ok |
| meetup:aws-user-group-bergstrasse | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7985 | ok |
| meetup:modern-work-munster | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8009 | ok |
| meetup:leaddev-meetup-munich | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7938 | ok |
| meetup:gemeinsam-mit-ki-koeln | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8043 | ok |
| meetup:php-user-group-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7918 | ok |
| meetup:elixir-ruhr-dev | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7903 | ok |
| meetup:owasp-cologne-chapter | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7875 | ok |
| meetup:lean-agile-sh | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8058 | ok |
| meetup:bochum-network-security-meetup-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7600 | ok |
| meetup:tech-meetup-sauerland | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8025 | ok |
| meetup:hack-the-box-meetup-leipzig-de | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7961 | ok |
| meetup:tech-talk-karlsruhe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7889 | ok |
| meetup:berlin-amazon-web-services-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7895 | ok |
| meetup:hackergarten-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8044 | ok |
| meetup:leaddev-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8047 | ok |
| meetup:audio-developer-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7868 | ok |
| meetup:opencoffeeclub_hamburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7965 | ok |
| meetup:robot-framework-usergroup-munsterland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7993 | ok |
| meetup:main-kinzig-nerds | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7966 | ok |
| meetup:rust-rhein-main | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7956 | ok |
| meetup:quality-engineering-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7969 | ok |
| meetup:do-dotnet | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7968 | ok |
| meetup:bergisches-entwicklerforum | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8069 | ok |
| meetup:cto-roundtable-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7935 | ok |
| meetup:tubingen-postgresql-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7938 | ok |
| meetup:42-shades-of-it | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7968 | ok |
| meetup:devops-freiburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8014 | ok |
| meetup:afterwork-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7924 | ok |
| meetup:react-berlin-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7976 | ok |
| meetup:webmontag-kassel | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7873 | ok |
| meetup:hannovr | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7817 | ok |
| meetup:cybersecurity-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7879 | ok |
| meetup:aws-user-group-bodensee | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8038 | ok |
| meetup:erfurt-wordpress-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7974 | ok |
| meetup:cyberforum-e-v-karlsruhe-hightech-unternehmer-netzwerk | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8033 | ok |
| meetup:auditing-ai-beyond-the-prompt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8089 | ok |
| meetup:dortmund-aws-user-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8029 | ok |
| meetup:aws-usergroup-munsterland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7951 | ok |
| meetup:digitalhubms | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7928 | ok |
| meetup:phpug-rhein-neckar | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7995 | ok |
| meetup:codecentric-dortmund-tech-talk | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7917 | ok |
| meetup:docker-black-forest | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7827 | ok |
| meetup:ddd-muc | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8079 | ok |
| meetup:php-usergroup-dresden | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8032 | ok |
| meetup:aachen-maker-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8031 | ok |
| meetup:ccdd-conciso-coding-dojo-dortmund | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7719 | ok |
| meetup:berlinawsug | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8059 | ok |
| meetup:owasp-augsburg-chapter | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7923 | ok |
| meetup:tech-n-talk-frankfurt | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7973 | ok |
| meetup:software-technology-meetup-pforzheim | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8025 | ok |
| meetup:gdg-hannover | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7972 | ok |
| meetup:bonn-bitcoin-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7991 | ok |
| meetup:scrumtisch-bonn | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8004 | ok |
| meetup:domain-driven-design-rhein-main | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7960 | ok |
| meetup:webwirtschaft | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7459 | ok |
| meetup:claude-meetup-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7969 | ok |
| meetup:global-ai-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:bass-hb | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:gamecreatorscologne | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:health-ai-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:ki-klub-werder-havel | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:data-ai-meetup-koln | curated | 0 | 0 | 0 | 0 | 0 | 0 | 6153 | empty |
| meetup:data-visualization-meetup-hamburg | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7234 | empty |
| meetup:berlin-computer-vision-group | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7880 | empty |
| meetup:berlin-women-in-machine-learning-and-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7922 | empty |
| meetup:kaggle-berlin | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7981 | empty |
| meetup:data-science-and-ai-frankfurt | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7929 | empty |
| meetup:applydata-munich | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7671 | empty |
| meetup:ai-transformation-camp | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7993 | empty |
| eventbrite-berlin | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-munich | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-cologne | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-hamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-stuttgart | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| startupcity-hamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 975 | empty |
| meetup:bochum-meetup-and-explore-the-community-meetup-group | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7976 | empty |
| meetup:hamburger-indie-treff | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7971 | empty |
| meetup:google-developers-group-munster | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7782 | empty |
| meetup:wpmeetup-potsdam | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8042 | empty |
| meetup:leipzig-golang | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7969 | empty |

## Scrape sources

| source | status | text chars | links | detail |
| --- | --- | --- | --- | --- |
| scrape:ki-verband-community | skipped |  |  | js: true (Playwright arrives later) |
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
| scrape:ki-verband-events | deferred |  |  | cap of 4 pages per run |
| scrape:bitkom | deferred |  |  | cap of 4 pages per run |
| scrape:allai | ready | 20464 | 36 |  |
| scrape:frankeundschwarz | ready | 32000 | 809 |  |
| scrape:eventseye | deferred |  |  | work/ size budget (150 KB) reached |
| scrape:conferenceindex | FAILED |  |  | HTTP 403 |

## Per city (after dedupe)

| city group | clusters | known | new |
| --- | --- | --- | --- |
| Berlin | 100 | 98 | 2 |
| Other Germany | 75 | 74 | 1 |
| Munich | 53 | 49 | 4 |
| Hamburg | 42 | 42 | 0 |
| Frankfurt | 29 | 29 | 0 |
| Unknown | 28 | 27 | 1 |
| Cologne | 25 | 24 | 1 |
| Online (DE) | 9 | 9 | 0 |
| Stuttgart | 8 | 8 | 0 |

Places inside "Other Germany" (after dedupe): Nuremberg 15, Leipzig 10, Hanover 6, Karlsruhe 5, Münster 5, Warendorf 5, Heidelberg 4, Freiburg 4, Dortmund 4, Kiel 2, Dresden 2, Chemnitz 2, Fürth 1, Kassel 1, Erlangen 1

## Dropped by filters (all sources)

| reason | count |
| --- | --- |
| country | 802 |
| keyword | 542 |
| window | 342 |
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
| 5 | Build Boldly, Fly Responsibly: AI Stories from Women in Tech | meetup:womentechmakershamburg, luma-hamburg, hackevents-ai, hackevents-data, brainberg |
| 5 | AI Builders Hamburg - Bring Your Own Laptop Edition - Dec 3 | meetup:aibuildersclub, hackevents-ai, hackevents-data, brainberg |
| 4 | Bob TV Episode 4: Why generic AI fails at mainframe scale - and what works | meetup:ibmpoweraiberlin, meetup:big-data-developers-in-berlin, meetup:ibmpoweraifrankfurt, meetup:ibm-developers |
| 4 | HH DS + ML Meetup at PIA Media | meetup:hamburg-data-science-meetup, hackevents-ai, hackevents-data, brainberg |

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

## Meetup group discovery

- global-ai-munich: ICS ok
- bass-hb: ICS ok
- dresdenjs-io-javascript-user-group: ICS ok
- gamecreatorscologne: ICS ok
- lalug-landshuter-linux-user-group-stammtisch: ICS ok
- health-ai-munich: ICS ok
- ki-klub-werder-havel: ICS ok

## Notes

- Ledger/ health/ cache files written; elapsed 207 s.
