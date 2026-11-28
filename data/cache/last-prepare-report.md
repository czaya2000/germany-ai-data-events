# Prepare run report

- Date: 2026-11-28 (window 120 days), mode: daily
- Feed sources: 247/247 reachable (100%), 6 disabled
- Totals: fetched 2219, in-window German 987, after keyword filter 497, after dedupe 313, known 309, new 4, sent to Claude 4, deferred by cap 0
- Ledger: 1188 entries, 61 pruned

## Per source (feed)

Columns: fetched = items parsed and normalised; in-window DE = passed country, window, cancelled and duration checks; kept = also passed the keyword filter; dedupe = clusters the source took part in; primary = clusters whose best record came from this source.

| source | trust | fetched | in-window DE | kept | dedupe | primary | errors | ms | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agentconfs | curated | 608 | 12 | 12 | 12 | 8 | 0 | 225 | ok |
| brainberg | noisy | 279 | 205 | 72 | 69 | 15 | 0 | 3532 | ok |
| hackevents-ai | noisy | 201 | 171 | 142 | 139 | 86 | 0 | 422 | ok |
| aieventlist-europe | curated | 161 | 19 | 19 | 19 | 9 | 0 | 1205 | ok |
| confstech | noisy | 138 | 2 | 0 | 0 | 0 | 0 | 1060 | ok |
| deutschlandki | curated | 55 | 15 | 15 | 15 | 15 | 0 | 545 | ok |
| hackevents-data | noisy | 50 | 40 | 33 | 33 | 8 | 0 | 789 | ok |
| luma-berlin | noisy | 47 | 47 | 5 | 5 | 5 | 0 | 114 | ok |
| bwcon | noisy | 22 | 13 | 5 | 5 | 5 | 0 | 944 | ok |
| lmu | noisy | 20 | 14 | 0 | 0 | 0 | 0 | 1461 | ok |
| aieventlist-berlin | curated | 17 | 7 | 7 | 7 | 3 | 0 | 896 | ok |
| devevents | noisy | 17 | 0 | 0 | 0 | 0 | 0 | 867 | ok |
| luma-hamburg | noisy | 16 | 16 | 2 | 2 | 2 | 0 | 1191 | ok |
| luma-munich | noisy | 15 | 15 | 3 | 3 | 3 | 0 | 952 | ok |
| aieventlist-munich | curated | 11 | 8 | 8 | 8 | 5 | 0 | 1765 | ok |
| meetup:ai-beavers | noisy | 10 | 10 | 10 | 10 | 10 | 0 | 8048 | ok |
| caiml | curated | 10 | 0 | 0 | 0 | 0 | 0 | 764 | ok |
| meetup:jug-bb | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 3874 | ok |
| meetup:silicon-allee-events | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8459 | ok |
| meetup:stuttgart-industrie-4-0-und-iot-meetup | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 8145 | ok |
| meetup:heidelberg-makers-meetup | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8188 | ok |
| meetup:game-developers-berlin | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8240 | ok |
| meetup:unternehmer-startups-meetup-rosenheim | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8109 | ok |
| meetup:uxchange | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8088 | ok |
| meetup:rosenheim-bitcoin-stammtisch | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8169 | ok |
| meetup:java-user-group-hannover | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 8127 | ok |
| meetup:leipzig-wordpress-meetup | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 8033 | ok |
| meetup:bitcoinkarlsruhe | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8087 | ok |
| meetup:softwerkskammer-luebeck | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8095 | ok |
| meetup:kubernetes-meetup-bielefeld | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8057 | ok |
| meetup:wpmeetup-stuttgart | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8086 | ok |
| meetup:chiemseebitcoinandblockchainmeetup | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8251 | ok |
| meetup:gamedevmuc | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8134 | ok |
| meetup:berlin-wordpress-meetup | noisy | 10 | 3 | 0 | 0 | 0 | 0 | 8027 | ok |
| meetup:makercube | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8121 | ok |
| meetup:rust-berlin | noisy | 10 | 9 | 9 | 9 | 9 | 0 | 8118 | ok |
| meetup:aibuildersclub | noisy | 10 | 10 | 10 | 10 | 10 | 0 | 8174 | ok |
| meetup:leipzig-python-user-group | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 8196 | ok |
| meetup:pycologne | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 8062 | ok |
| meetup:freifunk-oberhausen | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8168 | ok |
| meetup:dresdenjs-io-javascript-user-group | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 7735 | ok |
| meetup:lalug-landshuter-linux-user-group-stammtisch | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8080 | ok |
| meetup:emerging-tech-rhein-main-community | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8058 | ok |
| meetup:hamburg-c-net-meetup | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8095 | ok |
| meetup:lorawan-leipzig-usergroup | noisy | 10 | 10 | 10 | 4 | 4 | 0 | 8040 | ok |
| meetup:it-agile-community-events | noisy | 10 | 9 | 1 | 1 | 1 | 0 | 8044 | ok |
| luma-frankfurt | noisy | 9 | 9 | 2 | 2 | 1 | 0 | 1977 | ok |
| meetup:decentralized-trust-ruhrgebiet | noisy | 9 | 9 | 3 | 3 | 3 | 0 | 8163 | ok |
| meetup:munchen-ai-machine-learning-and-computer-vision-meetup | curated | 8 | 8 | 7 | 7 | 7 | 0 | 4526 | ok |
| meetup:betreute-intelligenz | curated | 8 | 4 | 4 | 4 | 4 | 0 | 8095 | ok |
| meetup:bliss-speaker-series | curated | 7 | 7 | 7 | 7 | 7 | 0 | 8169 | ok |
| meetup:pirateskills | curated | 7 | 4 | 4 | 4 | 4 | 0 | 8222 | ok |
| meetup:ibm-developers | noisy | 7 | 7 | 7 | 2 | 0 | 0 | 8257 | ok |
| meetup:muenster-macht-agil | noisy | 7 | 7 | 0 | 0 | 0 | 0 | 8098 | ok |
| aieventlist-frankfurt | curated | 5 | 2 | 2 | 2 | 1 | 0 | 2641 | ok |
| gfw-warendorf | curated | 5 | 5 | 3 | 3 | 3 | 0 | 2068 | ok |
| meetup:berlin-software-engineering-leadership-meetup-group | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 7993 | ok |
| meetup:hannover-unity-meetup | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 8128 | ok |
| mcml | curated | 4 | 4 | 3 | 3 | 3 | 0 | 764 | ok |
| hessian-ai | curated | 4 | 4 | 3 | 3 | 3 | 0 | 885 | ok |
| meetup:startup-factory-boost-network | noisy | 4 | 4 | 0 | 0 | 0 | 0 | 8089 | ok |
| meetup:code-for-munster | noisy | 4 | 4 | 0 | 0 | 0 | 0 | 8061 | ok |
| meetup:spawnpoint | noisy | 4 | 4 | 0 | 0 | 0 | 0 | 7898 | ok |
| meetup:maikers-ai-community | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8083 | ok |
| meetup:liberating-structures-user-group-rhein-main | noisy | 3 | 1 | 0 | 0 | 0 | 0 | 7852 | ok |
| meetup:gdg-nuremberg | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 7807 | ok |
| meetup:gamedevtreff-ruhrpott | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 7972 | ok |
| meetup:it-security-kassel | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8073 | ok |
| meetup:pydata-berlin | curated | 2 | 2 | 2 | 2 | 2 | 0 | 585 | ok |
| meetup:ibmpoweraiberlin | curated | 2 | 2 | 2 | 2 | 2 | 0 | 5263 | ok |
| meetup:ai-agenten-frankfurt | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8039 | ok |
| meetup:ai-nights-nurnberg | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8118 | ok |
| meetup:prompting-lab | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8015 | ok |
| aieventlist-hamburg | curated | 2 | 1 | 1 | 1 | 1 | 0 | 3812 | ok |
| aieventlist-stuttgart | curated | 2 | 2 | 2 | 2 | 2 | 0 | 5002 | ok |
| meetup:big-data-developers-in-berlin | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 7869 | ok |
| meetup:ibmpoweraifrankfurt | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 8087 | ok |
| meetup:big-data-developers-in-munich | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8016 | ok |
| meetup:ibm-powerai-dusseldorf | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8068 | ok |
| meetup:main-valley | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 7802 | ok |
| meetup:digital-craftsmanship-nordoberpfalz | noisy | 2 | 1 | 1 | 1 | 1 | 0 | 7782 | ok |
| meetup:azure-serverless-koln | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8025 | ok |
| meetup:the-test-tribe-frankfurt-meetup | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8003 | ok |
| meetup:ksug-in | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8056 | ok |
| meetup:berlinawsug | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8099 | ok |
| meetup:cologne-js | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7901 | ok |
| meetup:graphdb-dach | noisy | 2 | 2 | 2 | 2 | 1 | 0 | 7932 | ok |
| meetup:pydata-hamburg | curated | 1 | 1 | 1 | 1 | 0 | 0 | 1226 | ok |
| meetup:ai-professionals-munich | curated | 1 | 1 | 1 | 1 | 0 | 0 | 2162 | ok |
| meetup:clickhouse-meetup-munich | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8030 | ok |
| meetup:berlinai | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7846 | ok |
| meetup:agentic-ai-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7875 | ok |
| meetup:bonner-ki-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7961 | ok |
| meetup:ai-school-leipzig | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8029 | ok |
| meetup:ai-cloud-innovation-karlsruhe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8016 | ok |
| meetup:kassel-data-science-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8000 | ok |
| meetup:heidelberg-knowledge-graph-ai-hub | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7980 | ok |
| meetup:munich-snowflake-data-cloud-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8036 | ok |
| meetup:beads-berlin-ecosystem-for-analytics-and-data-systems | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8045 | ok |
| meetup:pass-microsoft-data-platform-usergroup-rheinland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7854 | ok |
| meetup:awsughh | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8037 | ok |
| meetup:ai-transformation-camp | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8020 | ok |
| aieventlist-cologne | curated | 1 | 1 | 1 | 1 | 0 | 0 | 4214 | ok |
| meetup:pydata-munchen | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 922 | ok |
| meetup:cybercologne-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7928 | ok |
| meetup:azure-bonn-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8044 | ok |
| meetup:jug-hamburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7636 | ok |
| meetup:gdg-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8084 | ok |
| meetup:net-user-group-karlsruhe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8221 | ok |
| meetup:isaqb-software-architektur-meetup-gruppe-fur-interessierte | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8025 | ok |
| meetup:pass-usergroup-rhein-main | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7721 | ok |
| meetup:hamburger-indie-treff | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7967 | ok |
| meetup:give-a-go | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7853 | ok |
| meetup:padagility | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7919 | ok |
| meetup:node-code-frankfurt | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8017 | ok |
| meetup:berlindroid | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8017 | ok |
| meetup:berlinbanktechnights | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7981 | ok |
| meetup:frontend-meetup-freiburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8039 | ok |
| meetup:opentechschool-leipzig | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7987 | ok |
| meetup:rewe-digital-events-cologne | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8080 | ok |
| meetup:hannover-python-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8032 | ok |
| meetup:godot-stammtisch-karlsruhe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7967 | ok |
| meetup:tech-talk-karlsruhe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7830 | ok |
| meetup:berlin-amazon-web-services-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8002 | ok |
| meetup:hackergarten-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8061 | ok |
| meetup:leaddev-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8065 | ok |
| meetup:audio-developer-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7879 | ok |
| meetup:opencoffeeclub_hamburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8047 | ok |
| meetup:robot-framework-usergroup-munsterland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8023 | ok |
| meetup:main-kinzig-nerds | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8182 | ok |
| meetup:rust-rhein-main | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7983 | ok |
| meetup:quality-engineering-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7960 | ok |
| meetup:do-dotnet | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7950 | ok |
| meetup:bergisches-entwicklerforum | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8036 | ok |
| meetup:cto-roundtable-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7985 | ok |
| meetup:tubingen-postgresql-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7789 | ok |
| meetup:42-shades-of-it | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7959 | ok |
| meetup:devops-freiburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8066 | ok |
| meetup:afterwork-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7920 | ok |
| meetup:react-berlin-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7998 | ok |
| meetup:webmontag-kassel | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7983 | ok |
| meetup:hannovr | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8001 | ok |
| meetup:cybersecurity-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8030 | ok |
| meetup:aws-user-group-bodensee | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8022 | ok |
| meetup:erfurt-wordpress-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7937 | ok |
| meetup:cyberforum-e-v-karlsruhe-hightech-unternehmer-netzwerk | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7988 | ok |
| meetup:auditing-ai-beyond-the-prompt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8008 | ok |
| meetup:dortmund-aws-user-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8000 | ok |
| meetup:aws-usergroup-munsterland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8007 | ok |
| meetup:digitalhubms | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7935 | ok |
| meetup:phpug-rhein-neckar | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8016 | ok |
| meetup:codecentric-dortmund-tech-talk | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8004 | ok |
| meetup:docker-black-forest | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7936 | ok |
| meetup:ddd-muc | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7985 | ok |
| meetup:php-usergroup-dresden | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7974 | ok |
| meetup:aachen-maker-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8049 | ok |
| meetup:ccdd-conciso-coding-dojo-dortmund | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7779 | ok |
| meetup:rethinking-ai-at-work | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7817 | ok |
| meetup:software-technology-meetup-pforzheim | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8012 | ok |
| meetup:gdg-hannover | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7947 | ok |
| meetup:bonn-bitcoin-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7990 | ok |
| meetup:scrumtisch-bonn | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8014 | ok |
| meetup:domain-driven-design-rhein-main | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8268 | ok |
| meetup:webwirtschaft | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7708 | ok |
| meetup:claude-meetup-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8019 | ok |
| meetup:global-ai-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8049 | ok |
| meetup:bass-hb | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8027 | ok |
| meetup:gamecreatorscologne | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7646 | ok |
| meetup:health-ai-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7844 | ok |
| meetup:ki-klub-werder-havel | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8008 | ok |
| meetup:obi-tech-talks | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8009 | ok |
| meetup:big-data-and-ai-saxony | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7989 | ok |
| meetup:purple-elbe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7911 | ok |
| meetup:hamburg-powershell-user-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7985 | ok |
| meetup:azure-dev-munich | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 7846 | ok |
| meetup:aws-user-group-mannheim | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7973 | ok |
| meetup:aws-usergroup-stuttgart | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8005 | ok |
| meetup:wordpress-meetup-dortmund | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7996 | ok |
| meetup:c-user-gruppe-aachen | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8002 | ok |
| meetup:rustcologne | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7974 | ok |
| meetup:dusseldorf-wordpress-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8011 | ok |
| meetup:tech-kalinen-muensterland | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8011 | ok |
| meetup:identibeer-karlsruhe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7980 | ok |
| meetup:grafana-friends-nuremberg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8035 | ok |
| meetup:munich-datageeks | curated | 0 | 0 | 0 | 0 | 0 | 0 | 3140 | empty |
| meetup:data-ai-meetup-koln | curated | 0 | 0 | 0 | 0 | 0 | 0 | 6204 | empty |
| meetup:data-visualization-meetup-hamburg | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7210 | empty |
| meetup:berlin-computer-vision-group | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7578 | empty |
| meetup:berlin-women-in-machine-learning-and-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7957 | empty |
| meetup:kaggle-berlin | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8002 | empty |
| meetup:data-science-and-ai-frankfurt | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8023 | empty |
| meetup:applydata-munich | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7610 | empty |
| meetup:hamburg-data-science-meetup | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7974 | empty |
| meetup:ai-agents-munich | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7795 | empty |
| meetup:sovereign-ai-meetup-ulm | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7789 | empty |
| meetup:artificial-intelligence-meetup-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8021 | empty |
| meetup:fra_aws | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7955 | empty |
| eventbrite-berlin | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-munich | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-cologne | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-hamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-stuttgart | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| startupcity-hamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 1234 | empty |
| meetup:grafana-friends-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 1624 | empty |
| meetup:producttank-nuernberg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 2540 | empty |
| meetup:tech-talk-stuttgart | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 2949 | empty |
| meetup:owasp-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 4356 | empty |
| meetup:wtm-berlin | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 5195 | empty |
| meetup:producttank-munich | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 6002 | empty |
| meetup:azure-dusseldorf-meetup | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 6536 | empty |
| meetup:openmates-meetup-group | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7085 | empty |
| meetup:inovex-meetup-erlangen | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7521 | empty |
| meetup:django-cologne | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7909 | empty |
| meetup:mannheim-java-usergroup | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7895 | empty |
| meetup:bochum-meetup-and-explore-the-community-meetup-group | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7935 | empty |
| meetup:google-developers-group-munster | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7889 | empty |
| meetup:wpmeetup-potsdam | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8153 | empty |
| meetup:checkmk-munich-group | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8007 | empty |
| meetup:devtalk-tk | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7733 | empty |
| meetup:womentechmakershamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7994 | empty |
| meetup:meetup-group-pnulfhzz | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8044 | empty |
| meetup:prodot-insights | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7980 | empty |
| meetup:cloud-native-munster | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7998 | empty |
| meetup:meetup-group-igafblfy | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8029 | empty |
| meetup:meetup-group-tfyvuydp | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7982 | empty |
| meetup:cloud-native-night | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7994 | empty |
| meetup:leipzig-golang | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7999 | empty |
| meetup:nordic-coding | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7960 | empty |
| meetup:rust-dortmund | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8020 | empty |
| meetup:jug-nurnberg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8063 | empty |
| meetup:le-software-craft-community | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8006 | empty |
| meetup:tech-talk-muenster | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7999 | empty |
| meetup:opensource-ruhr | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8000 | empty |
| meetup:scrum-user-group-karlsruhe | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7875 | empty |
| meetup:berlincplusplus | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8020 | empty |
| meetup:llvm-social-darmstadt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7902 | empty |
| meetup:lean-coffee-karlsruhe-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7985 | empty |
| meetup:aws-user-group-bergstrasse | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8057 | empty |
| meetup:modern-work-munster | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7964 | empty |
| meetup:leaddev-meetup-munich | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7984 | empty |
| meetup:gemeinsam-mit-ki-koeln | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7978 | empty |
| meetup:php-user-group-stuttgart | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8005 | empty |
| meetup:elixir-ruhr-dev | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7877 | empty |
| meetup:owasp-cologne-chapter | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7910 | empty |
| meetup:lean-agile-sh | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8040 | empty |
| meetup:bochum-network-security-meetup-group | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7985 | empty |
| meetup:tech-meetup-sauerland | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7968 | empty |
| meetup:hack-the-box-meetup-leipzig-de | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8020 | empty |
| meetup:owasp-augsburg-chapter | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7939 | empty |
| meetup:tech-n-talk-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7978 | empty |
| meetup:ai-knowledge-worker-meetup-leipzig | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7919 | empty |
| meetup:frankfurt-ai-safety | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7976 | empty |

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
| Berlin | 82 | 80 | 2 |
| Other Germany | 64 | 63 | 1 |
| Munich | 43 | 43 | 0 |
| Unknown | 35 | 34 | 1 |
| Hamburg | 35 | 35 | 0 |
| Frankfurt | 20 | 20 | 0 |
| Cologne | 19 | 19 | 0 |
| Stuttgart | 8 | 8 | 0 |
| Online (DE) | 7 | 7 | 0 |

Places inside "Other Germany" (after dedupe): Leipzig 16, Nuremberg 10, Hanover 6, Karlsruhe 4, Heidelberg 4, Dortmund 4, Warendorf 4, Münster 3, Dresden 3, Freiburg 2, Chemnitz 2, Fürth 1, Kassel 1, Gelnhausen 1, Halle 1

## Dropped by filters (all sources)

| reason | count |
| --- | --- |
| country | 826 |
| keyword | 490 |
| window | 402 |
| long | 4 |

## 10 largest dedupe clusters

| members | title | sources |
| --- | --- | --- |
| 11 | IBM Bob Coding Watch Party in Berlin & Online | meetup:ibmpoweraiberlin, meetup:big-data-developers-in-berlin, meetup:ibmpoweraifrankfurt, meetup:ibm-developers, hackevents-ai, hackevents-data |
| 7 | AI Coding Summit Berlin | meetup:berlinai, agentconfs, brainberg, hackevents-ai, aieventlist-berlin, aieventlist-europe |
| 6 | DevFest Munich 2026 - Munich Innovates: AI, Cloud & Beyond | meetup:gdg-munich, hackevents-ai, hackevents-data, brainberg, aieventlist-munich, aieventlist-europe |
| 6 | DATA festival 2027 | deutschlandki, agentconfs, hackevents-ai, hackevents-data, aieventlist-munich, aieventlist-europe |
| 5 | AI Builders Hamburg - Bring Your Own Laptop Edition - Dec 3 | meetup:aibuildersclub, hackevents-ai, hackevents-data, brainberg |
| 5 | #0XX Bastelrunde - Event Driven Development | meetup:lorawan-leipzig-usergroup, brainberg |
| 4 | Bob TV Episode 4: Why generic AI fails at mainframe scale - and what works | meetup:ibmpoweraiberlin, meetup:big-data-developers-in-berlin, meetup:ibmpoweraifrankfurt, meetup:ibm-developers |
| 4 | AI hackathon @ reply | meetup:maikers-ai-community, meetup:graphdb-dach, hackevents-ai, brainberg |
| 4 | Mit Agenten das Zuhause managen | meetup:agentic-ai-frankfurt, luma-frankfurt, hackevents-ai, brainberg |
| 4 | Kassel AI und Data Science Meetup | meetup:kassel-data-science-meetup, brainberg, hackevents-ai, hackevents-data |

## Failed or empty sources

- meetup:munich-datageeks: empty (0 items)
- meetup:data-ai-meetup-koln: empty (0 items)
- meetup:data-visualization-meetup-hamburg: empty (0 items)
- meetup:berlin-computer-vision-group: empty (0 items)
- meetup:berlin-women-in-machine-learning-and-data-science: empty (0 items)
- meetup:kaggle-berlin: empty (0 items)
- meetup:data-science-and-ai-frankfurt: empty (0 items)
- meetup:applydata-munich: empty (0 items)
- meetup:hamburg-data-science-meetup: empty (0 items)
- meetup:ai-agents-munich: empty (0 items)
- meetup:sovereign-ai-meetup-ulm: empty (0 items)
- meetup:artificial-intelligence-meetup-frankfurt: empty (0 items)
- meetup:fra_aws: empty (0 items)
- startupcity-hamburg: empty (0 items, 30 raw) - feed items carry no event date (pubDate is the publish date); needs a per-page fetch
- WARNING meetup:ai-agents-munich: returned zero items after 7 days of items
- WARNING meetup:artificial-intelligence-meetup-frankfurt: returned zero items after 7 days of items
- WARNING meetup:bochum-network-security-meetup-group: returned zero items after 7 days of items
- WARNING meetup:tech-meetup-sauerland: returned zero items after 7 days of items
- WARNING meetup:hack-the-box-meetup-leipzig-de: returned zero items after 7 days of items

## Notes

- Ledger/ health/ cache files written; elapsed 222 s.
