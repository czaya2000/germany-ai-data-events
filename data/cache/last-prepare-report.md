# Prepare run report

- Date: 2026-11-21 (window 120 days), mode: daily
- Feed sources: 219/219 reachable (100%), 6 disabled
- Totals: fetched 2251, in-window German 1125, after keyword filter 603, after dedupe 364, known 319, new 45, sent to Claude 45, deferred by cap 0
- Ledger: 950 entries, 0 pruned

## Per source (feed)

Columns: fetched = items parsed and normalised; in-window DE = passed country, window, cancelled and duration checks; kept = also passed the keyword filter; dedupe = clusters the source took part in; primary = clusters whose best record came from this source.

| source | trust | fetched | in-window DE | kept | dedupe | primary | errors | ms | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agentconfs | curated | 544 | 12 | 12 | 12 | 7 | 0 | 326 | ok |
| brainberg | noisy | 321 | 249 | 101 | 98 | 14 | 0 | 3727 | ok |
| hackevents-ai | noisy | 231 | 208 | 176 | 172 | 104 | 0 | 769 | ok |
| aieventlist-europe | curated | 171 | 23 | 23 | 23 | 10 | 0 | 910 | ok |
| confstech | noisy | 138 | 2 | 0 | 0 | 0 | 0 | 1093 | ok |
| hackevents-data | noisy | 60 | 52 | 45 | 45 | 9 | 0 | 364 | ok |
| luma-berlin | noisy | 51 | 51 | 4 | 4 | 4 | 0 | 1087 | ok |
| deutschlandki | curated | 50 | 17 | 17 | 17 | 17 | 0 | 308 | ok |
| bwcon | noisy | 25 | 17 | 7 | 7 | 6 | 0 | 848 | ok |
| devevents | noisy | 22 | 4 | 1 | 1 | 1 | 0 | 1264 | ok |
| luma-hamburg | noisy | 20 | 20 | 4 | 4 | 3 | 0 | 2007 | ok |
| lmu | noisy | 20 | 13 | 0 | 0 | 0 | 0 | 1167 | ok |
| luma-munich | noisy | 19 | 19 | 4 | 4 | 4 | 0 | 1175 | ok |
| aieventlist-berlin | curated | 15 | 6 | 6 | 6 | 3 | 0 | 1163 | ok |
| aieventlist-munich | curated | 12 | 11 | 11 | 11 | 9 | 0 | 1951 | ok |
| meetup:ai-beavers | noisy | 10 | 10 | 10 | 10 | 10 | 0 | 8191 | ok |
| caiml | curated | 10 | 0 | 0 | 0 | 0 | 0 | 1285 | ok |
| meetup:jug-bb | noisy | 10 | 5 | 0 | 0 | 0 | 0 | 3901 | ok |
| meetup:silicon-allee-events | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8380 | ok |
| meetup:stuttgart-industrie-4-0-und-iot-meetup | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 8155 | ok |
| meetup:heidelberg-makers-meetup | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8271 | ok |
| meetup:game-developers-berlin | noisy | 10 | 5 | 0 | 0 | 0 | 0 | 8296 | ok |
| meetup:unternehmer-startups-meetup-rosenheim | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8148 | ok |
| meetup:uxchange | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8069 | ok |
| meetup:rosenheim-bitcoin-stammtisch | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8159 | ok |
| meetup:java-user-group-hannover | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 8039 | ok |
| meetup:leipzig-wordpress-meetup | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 8134 | ok |
| meetup:bitcoinkarlsruhe | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8097 | ok |
| meetup:softwerkskammer-luebeck | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8114 | ok |
| meetup:kubernetes-meetup-bielefeld | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8144 | ok |
| meetup:wpmeetup-stuttgart | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8082 | ok |
| meetup:chiemseebitcoinandblockchainmeetup | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8212 | ok |
| meetup:gamedevmuc | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8089 | ok |
| meetup:berlin-wordpress-meetup | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8032 | ok |
| meetup:makercube | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:rust-berlin | noisy | 10 | 9 | 8 | 8 | 8 | 0 | 0 | ok |
| meetup:aibuildersclub | noisy | 10 | 10 | 10 | 9 | 9 | 0 | 0 | ok |
| meetup:leipzig-python-user-group | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 0 | ok |
| meetup:pycologne | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 0 | ok |
| meetup:freifunk-oberhausen | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:betreute-intelligenz | curated | 9 | 5 | 5 | 5 | 5 | 0 | 8146 | ok |
| luma-frankfurt | noisy | 8 | 8 | 1 | 1 | 1 | 0 | 2242 | ok |
| meetup:muenster-macht-agil | noisy | 8 | 8 | 0 | 0 | 0 | 0 | 8064 | ok |
| meetup:decentralized-trust-ruhrgebiet | noisy | 8 | 8 | 3 | 3 | 3 | 0 | 8176 | ok |
| meetup:pirateskills | curated | 7 | 4 | 4 | 4 | 4 | 0 | 8101 | ok |
| hessian-ai | curated | 7 | 7 | 6 | 6 | 6 | 0 | 1289 | ok |
| meetup:ibm-developers | noisy | 7 | 7 | 7 | 2 | 0 | 0 | 8209 | ok |
| meetup:munchen-ai-machine-learning-and-computer-vision-meetup | curated | 6 | 6 | 5 | 5 | 5 | 0 | 4487 | ok |
| meetup:bliss-speaker-series | curated | 6 | 6 | 6 | 6 | 6 | 0 | 8202 | ok |
| mcml | curated | 6 | 6 | 4 | 4 | 4 | 0 | 817 | ok |
| gfw-warendorf | curated | 6 | 6 | 4 | 4 | 4 | 0 | 2233 | ok |
| meetup:berlin-software-engineering-leadership-meetup-group | noisy | 6 | 6 | 0 | 0 | 0 | 0 | 7901 | ok |
| aieventlist-frankfurt | curated | 5 | 2 | 2 | 2 | 1 | 0 | 2946 | ok |
| meetup:startup-factory-boost-network | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 8150 | ok |
| meetup:hannover-unity-meetup | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 8058 | ok |
| meetup:spawnpoint | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 7916 | ok |
| meetup:ai-nights-nurnberg | curated | 4 | 4 | 4 | 4 | 4 | 0 | 8154 | ok |
| meetup:liberating-structures-user-group-rhein-main | noisy | 4 | 2 | 0 | 0 | 0 | 0 | 8110 | ok |
| meetup:code-for-munster | noisy | 4 | 4 | 0 | 0 | 0 | 0 | 8027 | ok |
| meetup:maikers-ai-community | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8012 | ok |
| aieventlist-hamburg | curated | 3 | 2 | 2 | 2 | 1 | 0 | 3879 | ok |
| meetup:digital-craftsmanship-nordoberpfalz | noisy | 3 | 2 | 2 | 2 | 2 | 0 | 7755 | ok |
| meetup:berlindroid | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 7954 | ok |
| meetup:hannover-python-meetup | noisy | 3 | 3 | 3 | 3 | 3 | 0 | 8006 | ok |
| meetup:gdg-nuremberg | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8228 | ok |
| meetup:gamedevtreff-ruhrpott | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 7902 | ok |
| meetup:it-security-kassel | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8035 | ok |
| meetup:pydata-berlin | curated | 2 | 2 | 2 | 2 | 2 | 0 | 285 | ok |
| meetup:pydata-hamburg | curated | 2 | 2 | 2 | 2 | 1 | 0 | 1190 | ok |
| meetup:ibmpoweraiberlin | curated | 2 | 2 | 2 | 2 | 2 | 0 | 5172 | ok |
| meetup:ai-agenten-frankfurt | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8070 | ok |
| aieventlist-cologne | curated | 2 | 2 | 2 | 2 | 1 | 0 | 4660 | ok |
| meetup:big-data-developers-in-berlin | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 8007 | ok |
| meetup:ibmpoweraifrankfurt | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 7931 | ok |
| meetup:big-data-developers-in-munich | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 7963 | ok |
| meetup:ibm-powerai-dusseldorf | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8144 | ok |
| meetup:jug-hamburg | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7489 | ok |
| meetup:main-valley | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 7833 | ok |
| meetup:give-a-go | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7870 | ok |
| meetup:berlinbanktechnights | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8056 | ok |
| meetup:frontend-meetup-freiburg | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8009 | ok |
| meetup:opentechschool-leipzig | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8005 | ok |
| meetup:rewe-digital-events-cologne | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8054 | ok |
| meetup:godot-stammtisch-karlsruhe | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7844 | ok |
| meetup:azure-serverless-koln | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8026 | ok |
| meetup:the-test-tribe-frankfurt-meetup | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8142 | ok |
| meetup:ksug-in | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8037 | ok |
| meetup:rethinking-ai-at-work | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 0 | ok |
| meetup:cologne-js | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:ai-professionals-munich | curated | 1 | 1 | 1 | 1 | 0 | 0 | 2149 | ok |
| meetup:munich-datageeks | curated | 1 | 1 | 1 | 1 | 1 | 0 | 3179 | ok |
| meetup:hamburg-data-science-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7956 | ok |
| meetup:clickhouse-meetup-munich | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8032 | ok |
| meetup:berlinai | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7977 | ok |
| meetup:ai-agents-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7850 | ok |
| meetup:agentic-ai-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7894 | ok |
| meetup:sovereign-ai-meetup-ulm | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7810 | ok |
| meetup:bonner-ki-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7964 | ok |
| meetup:ai-school-leipzig | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8023 | ok |
| meetup:ai-cloud-innovation-karlsruhe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8007 | ok |
| meetup:kassel-data-science-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7987 | ok |
| meetup:artificial-intelligence-meetup-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7998 | ok |
| meetup:heidelberg-knowledge-graph-ai-hub | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7978 | ok |
| meetup:munich-snowflake-data-cloud-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7997 | ok |
| meetup:beads-berlin-ecosystem-for-analytics-and-data-systems | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8061 | ok |
| meetup:pass-microsoft-data-platform-usergroup-rheinland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7646 | ok |
| meetup:awsughh | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8003 | ok |
| meetup:fra_aws | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8007 | ok |
| meetup:prompting-lab | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8020 | ok |
| meetup:pydata-munchen | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 559 | ok |
| meetup:grafana-friends-frankfurt | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 1174 | ok |
| meetup:producttank-nuernberg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 2007 | ok |
| meetup:tech-talk-stuttgart | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 2853 | ok |
| meetup:owasp-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 4085 | ok |
| meetup:wtm-berlin | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 4810 | ok |
| meetup:producttank-munich | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 5645 | ok |
| meetup:azure-dusseldorf-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6010 | ok |
| meetup:openmates-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6834 | ok |
| meetup:inovex-meetup-erlangen | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 6960 | ok |
| meetup:cybercologne-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7957 | ok |
| meetup:azure-bonn-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8227 | ok |
| meetup:gdg-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7912 | ok |
| meetup:net-user-group-karlsruhe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7999 | ok |
| meetup:isaqb-software-architektur-meetup-gruppe-fur-interessierte | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8007 | ok |
| meetup:django-cologne | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7970 | ok |
| meetup:mannheim-java-usergroup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8005 | ok |
| meetup:pass-usergroup-rhein-main | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8023 | ok |
| meetup:google-developers-group-munster | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7900 | ok |
| meetup:wpmeetup-potsdam | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7974 | ok |
| meetup:checkmk-munich-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8024 | ok |
| meetup:devtalk-tk | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7709 | ok |
| meetup:womentechmakershamburg | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8083 | ok |
| meetup:meetup-group-pnulfhzz | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8058 | ok |
| meetup:prodot-insights | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7784 | ok |
| meetup:padagility | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7939 | ok |
| meetup:cloud-native-munster | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7997 | ok |
| meetup:meetup-group-igafblfy | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8015 | ok |
| meetup:meetup-group-tfyvuydp | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8046 | ok |
| meetup:cloud-native-night | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7929 | ok |
| meetup:leipzig-golang | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7978 | ok |
| meetup:nordic-coding | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8005 | ok |
| meetup:node-code-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7884 | ok |
| meetup:rust-dortmund | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7968 | ok |
| meetup:jug-nurnberg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8008 | ok |
| meetup:le-software-craft-community | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8031 | ok |
| meetup:tech-talk-muenster | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8029 | ok |
| meetup:opensource-ruhr | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8001 | ok |
| meetup:scrum-user-group-karlsruhe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7911 | ok |
| meetup:berlincplusplus | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8028 | ok |
| meetup:llvm-social-darmstadt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7966 | ok |
| meetup:lean-coffee-karlsruhe-frankfurt | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7944 | ok |
| meetup:aws-user-group-bergstrasse | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7995 | ok |
| meetup:modern-work-munster | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7990 | ok |
| meetup:leaddev-meetup-munich | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7961 | ok |
| meetup:gemeinsam-mit-ki-koeln | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8034 | ok |
| meetup:php-user-group-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8352 | ok |
| meetup:elixir-ruhr-dev | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7867 | ok |
| meetup:owasp-cologne-chapter | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7918 | ok |
| meetup:lean-agile-sh | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8107 | ok |
| meetup:bochum-network-security-meetup-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8004 | ok |
| meetup:tech-meetup-sauerland | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7667 | ok |
| meetup:hack-the-box-meetup-leipzig-de | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8019 | ok |
| meetup:tech-talk-karlsruhe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7830 | ok |
| meetup:berlin-amazon-web-services-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7954 | ok |
| meetup:hackergarten-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7997 | ok |
| meetup:leaddev-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7993 | ok |
| meetup:audio-developer-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7952 | ok |
| meetup:opencoffeeclub_hamburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8029 | ok |
| meetup:robot-framework-usergroup-munsterland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7913 | ok |
| meetup:main-kinzig-nerds | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7983 | ok |
| meetup:rust-rhein-main | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7863 | ok |
| meetup:quality-engineering-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8006 | ok |
| meetup:do-dotnet | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7968 | ok |
| meetup:bergisches-entwicklerforum | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7966 | ok |
| meetup:cto-roundtable-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7869 | ok |
| meetup:tubingen-postgresql-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7802 | ok |
| meetup:42-shades-of-it | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8060 | ok |
| meetup:devops-freiburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7997 | ok |
| meetup:afterwork-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8118 | ok |
| meetup:react-berlin-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7978 | ok |
| meetup:webmontag-kassel | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7992 | ok |
| meetup:hannovr | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7759 | ok |
| meetup:cybersecurity-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8009 | ok |
| meetup:aws-user-group-bodensee | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7942 | ok |
| meetup:erfurt-wordpress-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8027 | ok |
| meetup:cyberforum-e-v-karlsruhe-hightech-unternehmer-netzwerk | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7933 | ok |
| meetup:auditing-ai-beyond-the-prompt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7979 | ok |
| meetup:dortmund-aws-user-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8020 | ok |
| meetup:aws-usergroup-munsterland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8020 | ok |
| meetup:digitalhubms | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7945 | ok |
| meetup:phpug-rhein-neckar | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7975 | ok |
| meetup:codecentric-dortmund-tech-talk | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8021 | ok |
| meetup:docker-black-forest | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7926 | ok |
| meetup:ddd-muc | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7994 | ok |
| meetup:php-usergroup-dresden | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7994 | ok |
| meetup:aachen-maker-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8052 | ok |
| meetup:ccdd-conciso-coding-dojo-dortmund | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7781 | ok |
| meetup:berlinawsug | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:owasp-augsburg-chapter | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:tech-n-talk-frankfurt | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:software-technology-meetup-pforzheim | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:gdg-hannover | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:bonn-bitcoin-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:scrumtisch-bonn | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:domain-driven-design-rhein-main | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:webwirtschaft | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:claude-meetup-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:data-ai-meetup-koln | curated | 0 | 0 | 0 | 0 | 0 | 0 | 6136 | empty |
| meetup:data-visualization-meetup-hamburg | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7144 | empty |
| meetup:berlin-computer-vision-group | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7947 | empty |
| meetup:berlin-women-in-machine-learning-and-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7943 | empty |
| meetup:kaggle-berlin | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8001 | empty |
| meetup:data-science-and-ai-frankfurt | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8006 | empty |
| meetup:applydata-munich | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7642 | empty |
| meetup:ai-transformation-camp | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7925 | empty |
| eventbrite-berlin | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-munich | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-cologne | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-hamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-stuttgart | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| aieventlist-stuttgart | curated | 0 | 0 | 0 | 0 | 0 | 0 | 5240 | empty |
| startupcity-hamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 745 | empty |
| meetup:bochum-meetup-and-explore-the-community-meetup-group | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7956 | empty |
| meetup:hamburger-indie-treff | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7899 | empty |

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
| Berlin | 98 | 81 | 17 |
| Other Germany | 76 | 69 | 7 |
| Munich | 48 | 44 | 4 |
| Hamburg | 42 | 41 | 1 |
| Unknown | 29 | 16 | 13 |
| Frankfurt | 29 | 27 | 2 |
| Cologne | 25 | 24 | 1 |
| Online (DE) | 9 | 9 | 0 |
| Stuttgart | 8 | 8 | 0 |

Places inside "Other Germany" (after dedupe): Nuremberg 15, Leipzig 10, Münster 6, Hanover 6, Karlsruhe 5, Warendorf 5, Heidelberg 4, Freiburg 4, Dortmund 4, Chemnitz 3, Kiel 2, Essen 2, Fürth 1, Kassel 1, Erlangen 1

## Dropped by filters (all sources)

| reason | count |
| --- | --- |
| country | 793 |
| keyword | 521 |
| window | 329 |
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
| 4 | MSUG / Year Closing Event 26 | meetup:munich-snowflake-data-cloud-meetup-group, hackevents-ai, hackevents-data, brainberg |

## Failed or empty sources

- meetup:data-ai-meetup-koln: empty (0 items)
- meetup:data-visualization-meetup-hamburg: empty (0 items)
- meetup:berlin-computer-vision-group: empty (0 items)
- meetup:berlin-women-in-machine-learning-and-data-science: empty (0 items)
- meetup:kaggle-berlin: empty (0 items)
- meetup:data-science-and-ai-frankfurt: empty (0 items)
- meetup:applydata-munich: empty (0 items)
- meetup:ai-transformation-camp: empty (0 items)
- aieventlist-stuttgart: empty (0 items)
- startupcity-hamburg: empty (0 items, 30 raw) - feed items carry no event date (pubDate is the publish date); needs a per-page fetch

## Meetup group discovery

- berlinawsug: ICS ok
- owasp-augsburg-chapter: ICS ok
- makercube: ICS ok
- tech-n-talk-frankfurt: ICS ok
- rust-berlin: ICS ok
- rethinking-ai-at-work: ICS ok
- software-technology-meetup-pforzheim: ICS ok
- gdg-hannover: ICS ok
- aibuildersclub: ICS ok
- bonn-bitcoin-meetup: ICS ok
- cologne-js: ICS ok
- scrumtisch-bonn: ICS ok
- leipzig-python-user-group: ICS ok
- domain-driven-design-rhein-main: ICS ok
- pycologne: ICS ok
- freifunk-oberhausen: ICS ok
- webwirtschaft: ICS ok
- claude-meetup-frankfurt: ICS ok

## Notes

- Ledger/ health/ cache files written; elapsed 193 s.
