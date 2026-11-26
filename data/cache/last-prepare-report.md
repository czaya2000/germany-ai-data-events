# Prepare run report

- Date: 2026-11-26 (window 120 days), mode: daily
- Feed sources: 234/234 reachable (100%), 6 disabled
- Totals: fetched 2173, in-window German 1045, after keyword filter 542, after dedupe 337, known 323, new 14, sent to Claude 14, deferred by cap 0
- Ledger: 1151 entries, 0 pruned

## Per source (feed)

Columns: fetched = items parsed and normalised; in-window DE = passed country, window, cancelled and duration checks; kept = also passed the keyword filter; dedupe = clusters the source took part in; primary = clusters whose best record came from this source.

| source | trust | fetched | in-window DE | kept | dedupe | primary | errors | ms | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agentconfs | curated | 515 | 11 | 11 | 11 | 7 | 0 | 313 | ok |
| brainberg | noisy | 297 | 224 | 87 | 84 | 16 | 0 | 2523 | ok |
| hackevents-ai | noisy | 210 | 186 | 155 | 151 | 93 | 0 | 410 | ok |
| aieventlist-europe | curated | 173 | 21 | 21 | 21 | 9 | 0 | 715 | ok |
| confstech | noisy | 138 | 2 | 0 | 0 | 0 | 0 | 1009 | ok |
| deutschlandki | curated | 58 | 17 | 17 | 17 | 17 | 0 | 375 | ok |
| hackevents-data | noisy | 54 | 45 | 37 | 37 | 9 | 0 | 822 | ok |
| luma-berlin | noisy | 52 | 52 | 7 | 7 | 7 | 0 | 1109 | ok |
| bwcon | noisy | 23 | 15 | 6 | 6 | 6 | 0 | 707 | ok |
| lmu | noisy | 20 | 15 | 0 | 0 | 0 | 0 | 652 | ok |
| luma-munich | noisy | 17 | 17 | 4 | 4 | 4 | 0 | 1422 | ok |
| aieventlist-berlin | curated | 17 | 7 | 7 | 7 | 3 | 0 | 975 | ok |
| devevents | noisy | 16 | 3 | 1 | 1 | 1 | 0 | 243 | ok |
| luma-hamburg | noisy | 15 | 15 | 2 | 2 | 2 | 0 | 2008 | ok |
| aieventlist-munich | curated | 13 | 10 | 10 | 10 | 8 | 0 | 1945 | ok |
| meetup:ai-beavers | noisy | 10 | 10 | 10 | 10 | 10 | 0 | 7998 | ok |
| caiml | curated | 10 | 0 | 0 | 0 | 0 | 0 | 507 | ok |
| meetup:jug-bb | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 4197 | ok |
| meetup:silicon-allee-events | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8543 | ok |
| meetup:stuttgart-industrie-4-0-und-iot-meetup | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 8310 | ok |
| meetup:heidelberg-makers-meetup | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8225 | ok |
| meetup:game-developers-berlin | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8327 | ok |
| meetup:unternehmer-startups-meetup-rosenheim | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8033 | ok |
| meetup:uxchange | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8149 | ok |
| meetup:rosenheim-bitcoin-stammtisch | noisy | 10 | 5 | 0 | 0 | 0 | 0 | 8138 | ok |
| meetup:java-user-group-hannover | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 8017 | ok |
| meetup:leipzig-wordpress-meetup | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 8002 | ok |
| meetup:bitcoinkarlsruhe | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8082 | ok |
| meetup:softwerkskammer-luebeck | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8133 | ok |
| meetup:kubernetes-meetup-bielefeld | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8093 | ok |
| meetup:wpmeetup-stuttgart | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8088 | ok |
| meetup:chiemseebitcoinandblockchainmeetup | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8292 | ok |
| meetup:gamedevmuc | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8073 | ok |
| meetup:berlin-wordpress-meetup | noisy | 10 | 3 | 0 | 0 | 0 | 0 | 8042 | ok |
| meetup:makercube | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8112 | ok |
| meetup:rust-berlin | noisy | 10 | 10 | 8 | 8 | 8 | 0 | 8289 | ok |
| meetup:aibuildersclub | noisy | 10 | 10 | 10 | 8 | 8 | 0 | 8273 | ok |
| meetup:leipzig-python-user-group | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 7860 | ok |
| meetup:pycologne | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 8115 | ok |
| meetup:freifunk-oberhausen | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8062 | ok |
| meetup:dresdenjs-io-javascript-user-group | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 7956 | ok |
| meetup:lalug-landshuter-linux-user-group-stammtisch | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 7938 | ok |
| meetup:emerging-tech-rhein-main-community | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8167 | ok |
| meetup:betreute-intelligenz | curated | 9 | 5 | 5 | 5 | 5 | 0 | 8227 | ok |
| luma-frankfurt | noisy | 9 | 9 | 2 | 2 | 1 | 0 | 2378 | ok |
| meetup:decentralized-trust-ruhrgebiet | noisy | 9 | 9 | 3 | 3 | 3 | 0 | 8243 | ok |
| meetup:munchen-ai-machine-learning-and-computer-vision-meetup | curated | 8 | 8 | 7 | 7 | 7 | 0 | 4472 | ok |
| meetup:muenster-macht-agil | noisy | 8 | 8 | 0 | 0 | 0 | 0 | 8171 | ok |
| meetup:bliss-speaker-series | curated | 7 | 7 | 7 | 7 | 7 | 0 | 8155 | ok |
| meetup:pirateskills | curated | 7 | 4 | 4 | 4 | 4 | 0 | 8184 | ok |
| meetup:ibm-developers | noisy | 7 | 7 | 7 | 2 | 0 | 0 | 8118 | ok |
| hessian-ai | curated | 6 | 6 | 5 | 5 | 5 | 0 | 805 | ok |
| aieventlist-frankfurt | curated | 6 | 3 | 3 | 3 | 1 | 0 | 2804 | ok |
| mcml | curated | 5 | 5 | 4 | 4 | 4 | 0 | 467 | ok |
| gfw-warendorf | curated | 5 | 5 | 3 | 3 | 3 | 0 | 1357 | ok |
| meetup:berlin-software-engineering-leadership-meetup-group | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 8045 | ok |
| meetup:spawnpoint | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 7929 | ok |
| meetup:startup-factory-boost-network | noisy | 4 | 4 | 0 | 0 | 0 | 0 | 8124 | ok |
| meetup:hannover-unity-meetup | noisy | 4 | 4 | 0 | 0 | 0 | 0 | 8066 | ok |
| meetup:code-for-munster | noisy | 4 | 4 | 0 | 0 | 0 | 0 | 7974 | ok |
| meetup:maikers-ai-community | curated | 3 | 3 | 3 | 3 | 3 | 0 | 7985 | ok |
| meetup:ai-nights-nurnberg | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8148 | ok |
| meetup:prompting-lab | noisy | 3 | 3 | 3 | 3 | 3 | 0 | 8034 | ok |
| meetup:liberating-structures-user-group-rhein-main | noisy | 3 | 1 | 0 | 0 | 0 | 0 | 8057 | ok |
| meetup:node-code-frankfurt | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8046 | ok |
| meetup:gdg-nuremberg | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8089 | ok |
| meetup:gamedevtreff-ruhrpott | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 7951 | ok |
| meetup:it-security-kassel | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8075 | ok |
| meetup:pydata-berlin | curated | 2 | 2 | 2 | 2 | 2 | 0 | 195 | ok |
| meetup:ibmpoweraiberlin | curated | 2 | 2 | 2 | 2 | 2 | 0 | 5134 | ok |
| meetup:ai-agenten-frankfurt | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8068 | ok |
| aieventlist-hamburg | curated | 2 | 1 | 1 | 1 | 1 | 0 | 3403 | ok |
| meetup:big-data-developers-in-berlin | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 7942 | ok |
| meetup:ibmpoweraifrankfurt | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 8038 | ok |
| meetup:big-data-developers-in-munich | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 7981 | ok |
| meetup:ibm-powerai-dusseldorf | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8045 | ok |
| meetup:jug-hamburg | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7554 | ok |
| meetup:main-valley | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8069 | ok |
| meetup:digital-craftsmanship-nordoberpfalz | noisy | 2 | 1 | 1 | 1 | 1 | 0 | 7792 | ok |
| meetup:frontend-meetup-freiburg | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8075 | ok |
| meetup:opentechschool-leipzig | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8114 | ok |
| meetup:rewe-digital-events-cologne | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8100 | ok |
| meetup:hannover-python-meetup | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8059 | ok |
| meetup:godot-stammtisch-karlsruhe | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7996 | ok |
| meetup:azure-serverless-koln | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8021 | ok |
| meetup:the-test-tribe-frankfurt-meetup | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8030 | ok |
| meetup:berlinawsug | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8062 | ok |
| meetup:rethinking-ai-at-work | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 7712 | ok |
| meetup:cologne-js | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7911 | ok |
| meetup:pydata-hamburg | curated | 1 | 1 | 1 | 1 | 0 | 0 | 1163 | ok |
| meetup:ai-professionals-munich | curated | 1 | 1 | 1 | 1 | 0 | 0 | 2151 | ok |
| meetup:munich-datageeks | curated | 1 | 1 | 1 | 1 | 1 | 0 | 3153 | ok |
| meetup:hamburg-data-science-meetup | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8017 | ok |
| meetup:clickhouse-meetup-munich | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8027 | ok |
| meetup:berlinai | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7972 | ok |
| meetup:ai-agents-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7896 | ok |
| meetup:agentic-ai-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7812 | ok |
| meetup:bonner-ki-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7952 | ok |
| meetup:ai-school-leipzig | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8002 | ok |
| meetup:ai-cloud-innovation-karlsruhe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7991 | ok |
| meetup:kassel-data-science-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8001 | ok |
| meetup:artificial-intelligence-meetup-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7957 | ok |
| meetup:heidelberg-knowledge-graph-ai-hub | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7999 | ok |
| meetup:munich-snowflake-data-cloud-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8019 | ok |
| meetup:beads-berlin-ecosystem-for-analytics-and-data-systems | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8044 | ok |
| meetup:pass-microsoft-data-platform-usergroup-rheinland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7897 | ok |
| meetup:awsughh | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8063 | ok |
| meetup:fra_aws | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8212 | ok |
| meetup:ai-transformation-camp | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8039 | ok |
| aieventlist-cologne | curated | 1 | 1 | 1 | 1 | 0 | 0 | 4321 | ok |
| aieventlist-stuttgart | curated | 1 | 1 | 1 | 1 | 1 | 0 | 5168 | ok |
| meetup:pydata-munchen | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 961 | ok |
| meetup:grafana-friends-frankfurt | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 2004 | ok |
| meetup:inovex-meetup-erlangen | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7428 | ok |
| meetup:cybercologne-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7742 | ok |
| meetup:azure-bonn-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8045 | ok |
| meetup:gdg-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8018 | ok |
| meetup:net-user-group-karlsruhe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7981 | ok |
| meetup:isaqb-software-architektur-meetup-gruppe-fur-interessierte | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7999 | ok |
| meetup:pass-usergroup-rhein-main | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7997 | ok |
| meetup:give-a-go | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7672 | ok |
| meetup:padagility | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7943 | ok |
| meetup:berlindroid | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7982 | ok |
| meetup:berlinbanktechnights | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7925 | ok |
| meetup:modern-work-munster | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8033 | ok |
| meetup:leaddev-meetup-munich | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7976 | ok |
| meetup:gemeinsam-mit-ki-koeln | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7999 | ok |
| meetup:php-user-group-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7991 | ok |
| meetup:elixir-ruhr-dev | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7897 | ok |
| meetup:owasp-cologne-chapter | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7847 | ok |
| meetup:lean-agile-sh | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8154 | ok |
| meetup:bochum-network-security-meetup-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7952 | ok |
| meetup:tech-meetup-sauerland | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8007 | ok |
| meetup:hack-the-box-meetup-leipzig-de | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7959 | ok |
| meetup:tech-talk-karlsruhe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7854 | ok |
| meetup:berlin-amazon-web-services-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7888 | ok |
| meetup:hackergarten-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8054 | ok |
| meetup:leaddev-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8052 | ok |
| meetup:audio-developer-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7904 | ok |
| meetup:opencoffeeclub_hamburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7998 | ok |
| meetup:robot-framework-usergroup-munsterland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7955 | ok |
| meetup:main-kinzig-nerds | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8000 | ok |
| meetup:rust-rhein-main | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7979 | ok |
| meetup:quality-engineering-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7938 | ok |
| meetup:do-dotnet | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8033 | ok |
| meetup:bergisches-entwicklerforum | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8112 | ok |
| meetup:cto-roundtable-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7956 | ok |
| meetup:tubingen-postgresql-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7757 | ok |
| meetup:42-shades-of-it | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7980 | ok |
| meetup:devops-freiburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8099 | ok |
| meetup:afterwork-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7930 | ok |
| meetup:react-berlin-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7993 | ok |
| meetup:webmontag-kassel | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7926 | ok |
| meetup:hannovr | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7888 | ok |
| meetup:cybersecurity-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7987 | ok |
| meetup:aws-user-group-bodensee | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7981 | ok |
| meetup:erfurt-wordpress-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7869 | ok |
| meetup:cyberforum-e-v-karlsruhe-hightech-unternehmer-netzwerk | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7984 | ok |
| meetup:auditing-ai-beyond-the-prompt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8000 | ok |
| meetup:dortmund-aws-user-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8034 | ok |
| meetup:aws-usergroup-munsterland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8019 | ok |
| meetup:digitalhubms | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7921 | ok |
| meetup:phpug-rhein-neckar | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8003 | ok |
| meetup:codecentric-dortmund-tech-talk | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8016 | ok |
| meetup:docker-black-forest | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7909 | ok |
| meetup:ddd-muc | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7976 | ok |
| meetup:php-usergroup-dresden | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7954 | ok |
| meetup:aachen-maker-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8005 | ok |
| meetup:ccdd-conciso-coding-dojo-dortmund | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7896 | ok |
| meetup:ksug-in | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7977 | ok |
| meetup:tech-n-talk-frankfurt | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8026 | ok |
| meetup:software-technology-meetup-pforzheim | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7973 | ok |
| meetup:gdg-hannover | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8019 | ok |
| meetup:bonn-bitcoin-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8022 | ok |
| meetup:scrumtisch-bonn | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7974 | ok |
| meetup:domain-driven-design-rhein-main | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8014 | ok |
| meetup:webwirtschaft | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7673 | ok |
| meetup:claude-meetup-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8125 | ok |
| meetup:global-ai-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8068 | ok |
| meetup:bass-hb | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8023 | ok |
| meetup:gamecreatorscologne | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7941 | ok |
| meetup:health-ai-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7915 | ok |
| meetup:ki-klub-werder-havel | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8024 | ok |
| meetup:obi-tech-talks | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7897 | ok |
| meetup:ai-knowledge-worker-meetup-leipzig | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7917 | ok |
| meetup:big-data-and-ai-saxony | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7995 | ok |
| meetup:purple-elbe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7926 | ok |
| meetup:hamburg-powershell-user-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7977 | ok |
| meetup:azure-dev-munich | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 7895 | ok |
| meetup:aws-user-group-mannheim | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7998 | ok |
| meetup:data-ai-meetup-koln | curated | 0 | 0 | 0 | 0 | 0 | 0 | 6087 | empty |
| meetup:data-visualization-meetup-hamburg | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7110 | empty |
| meetup:berlin-computer-vision-group | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7899 | empty |
| meetup:berlin-women-in-machine-learning-and-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7929 | empty |
| meetup:kaggle-berlin | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7919 | empty |
| meetup:data-science-and-ai-frankfurt | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7918 | empty |
| meetup:applydata-munich | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7622 | empty |
| meetup:sovereign-ai-meetup-ulm | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7820 | empty |
| eventbrite-berlin | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-munich | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-cologne | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-hamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-stuttgart | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| startupcity-hamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 614 | empty |
| meetup:producttank-nuernberg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 2560 | empty |
| meetup:tech-talk-stuttgart | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 3475 | empty |
| meetup:owasp-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 4999 | empty |
| meetup:wtm-berlin | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 5505 | empty |
| meetup:producttank-munich | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 5993 | empty |
| meetup:azure-dusseldorf-meetup | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 6423 | empty |
| meetup:openmates-meetup-group | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7298 | empty |
| meetup:django-cologne | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7890 | empty |
| meetup:mannheim-java-usergroup | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7929 | empty |
| meetup:bochum-meetup-and-explore-the-community-meetup-group | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7768 | empty |
| meetup:hamburger-indie-treff | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7929 | empty |
| meetup:google-developers-group-munster | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7856 | empty |
| meetup:wpmeetup-potsdam | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7983 | empty |
| meetup:checkmk-munich-group | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8083 | empty |
| meetup:devtalk-tk | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7754 | empty |
| meetup:womentechmakershamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8018 | empty |
| meetup:meetup-group-pnulfhzz | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8006 | empty |
| meetup:prodot-insights | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7955 | empty |
| meetup:cloud-native-munster | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7908 | empty |
| meetup:meetup-group-igafblfy | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8002 | empty |
| meetup:meetup-group-tfyvuydp | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8046 | empty |
| meetup:cloud-native-night | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7993 | empty |
| meetup:leipzig-golang | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8023 | empty |
| meetup:nordic-coding | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7975 | empty |
| meetup:rust-dortmund | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8012 | empty |
| meetup:jug-nurnberg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7987 | empty |
| meetup:le-software-craft-community | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7997 | empty |
| meetup:tech-talk-muenster | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7976 | empty |
| meetup:opensource-ruhr | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8007 | empty |
| meetup:scrum-user-group-karlsruhe | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7852 | empty |
| meetup:berlincplusplus | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8016 | empty |
| meetup:llvm-social-darmstadt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7991 | empty |
| meetup:lean-coffee-karlsruhe-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7979 | empty |
| meetup:aws-user-group-bergstrasse | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8001 | empty |
| meetup:owasp-augsburg-chapter | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7870 | empty |

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
| scrape:tu-berlin | not due |  |  | slot day 3 |
| scrape:hpi | not due |  |  | slot day 3 |
| scrape:kit | not due |  |  | slot day 3 |
| scrape:helmholtz-ai | not due |  |  | slot day 3 |
| scrape:fraunhofer | not due |  |  | slot day 3 |
| scrape:gi | not due |  |  | slot day 3 |
| scrape:gi-fb-ki | not due |  |  | slot day 3 |
| scrape:mpg | skipped |  |  | js: true (Playwright arrives later) |
| scrape:ai-hub-lmu | not due |  |  | slot day 3 |
| scrape:techquartier | skipped |  |  | js: true (Playwright arrives later) |
| scrape:startup-region-stuttgart | deferred |  |  | cap of 4 pages per run |
| scrape:it-region-stuttgart | deferred |  |  | cap of 4 pages per run |
| scrape:aitinkerers-berlin | deferred |  |  | cap of 4 pages per run |
| scrape:aitinkerers-munich | deferred |  |  | cap of 4 pages per run |
| scrape:aitinkerers-hamburg | deferred |  |  | cap of 4 pages per run |
| scrape:unternehmertum | ready | 1935 | 1 |  |
| scrape:nextmedia-hamburg | ready | 1926 | 0 |  |
| scrape:starthub-hessen | ready | 6678 | 23 |  |
| scrape:startplatz | ready | 12893 | 92 |  |

## Per city (after dedupe)

| city group | clusters | known | new |
| --- | --- | --- | --- |
| Berlin | 88 | 83 | 5 |
| Other Germany | 70 | 68 | 2 |
| Munich | 51 | 49 | 2 |
| Hamburg | 37 | 36 | 1 |
| Unknown | 31 | 28 | 3 |
| Frankfurt | 26 | 25 | 1 |
| Cologne | 21 | 21 | 0 |
| Online (DE) | 7 | 7 | 0 |
| Stuttgart | 6 | 6 | 0 |

Places inside "Other Germany" (after dedupe): Nuremberg 13, Leipzig 12, Hanover 7, Karlsruhe 5, Heidelberg 4, Münster 4, Freiburg 4, Dortmund 4, Warendorf 4, Dresden 3, Chemnitz 2, Fürth 1, Kassel 1, Erlangen 1, Kiel 1

## Dropped by filters (all sources)

| reason | count |
| --- | --- |
| country | 764 |
| keyword | 503 |
| window | 360 |
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
| 4 | MSUG / Year Closing Event 26 | meetup:munich-snowflake-data-cloud-meetup-group, hackevents-ai, hackevents-data, brainberg |

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

## Notes

- Ledger/ health/ cache files written; elapsed 215 s.
