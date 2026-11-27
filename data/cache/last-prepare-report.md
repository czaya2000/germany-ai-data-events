# Prepare run report

- Date: 2026-11-27 (window 120 days), mode: daily
- Feed sources: 247/247 reachable (100%), 6 disabled
- Totals: fetched 2257, in-window German 1019, after keyword filter 515, after dedupe 320, known 305, new 15, sent to Claude 15, deferred by cap 0
- Ledger: 1202 entries, 0 pruned

## Per source (feed)

Columns: fetched = items parsed and normalised; in-window DE = passed country, window, cancelled and duration checks; kept = also passed the keyword filter; dedupe = clusters the source took part in; primary = clusters whose best record came from this source.

| source | trust | fetched | in-window DE | kept | dedupe | primary | errors | ms | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| agentconfs | curated | 615 | 12 | 12 | 12 | 8 | 0 | 397 | ok |
| brainberg | noisy | 292 | 218 | 77 | 74 | 14 | 0 | 2715 | ok |
| hackevents-ai | noisy | 204 | 176 | 147 | 144 | 90 | 0 | 452 | ok |
| aieventlist-europe | curated | 164 | 20 | 20 | 20 | 9 | 0 | 989 | ok |
| confstech | noisy | 138 | 2 | 0 | 0 | 0 | 0 | 1086 | ok |
| deutschlandki | curated | 55 | 15 | 15 | 15 | 15 | 0 | 574 | ok |
| luma-berlin | noisy | 50 | 50 | 5 | 5 | 5 | 0 | 287 | ok |
| hackevents-data | noisy | 49 | 40 | 33 | 33 | 7 | 0 | 683 | ok |
| bwcon | noisy | 22 | 13 | 5 | 5 | 5 | 0 | 860 | ok |
| lmu | noisy | 20 | 9 | 0 | 0 | 0 | 0 | 805 | ok |
| luma-hamburg | noisy | 17 | 17 | 3 | 3 | 2 | 0 | 1218 | ok |
| aieventlist-berlin | curated | 17 | 7 | 7 | 7 | 3 | 0 | 1048 | ok |
| luma-munich | noisy | 16 | 16 | 3 | 3 | 3 | 0 | 850 | ok |
| devevents | noisy | 14 | 2 | 0 | 0 | 0 | 0 | 853 | ok |
| aieventlist-munich | curated | 13 | 10 | 10 | 10 | 7 | 0 | 1907 | ok |
| meetup:ai-beavers | noisy | 10 | 10 | 10 | 10 | 10 | 0 | 8105 | ok |
| caiml | curated | 10 | 0 | 0 | 0 | 0 | 0 | 612 | ok |
| meetup:jug-bb | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 4197 | ok |
| meetup:silicon-allee-events | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8596 | ok |
| meetup:stuttgart-industrie-4-0-und-iot-meetup | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 8217 | ok |
| meetup:heidelberg-makers-meetup | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8222 | ok |
| meetup:game-developers-berlin | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8274 | ok |
| meetup:unternehmer-startups-meetup-rosenheim | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8220 | ok |
| meetup:uxchange | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8071 | ok |
| meetup:rosenheim-bitcoin-stammtisch | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8071 | ok |
| meetup:java-user-group-hannover | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 8037 | ok |
| meetup:leipzig-wordpress-meetup | noisy | 10 | 4 | 1 | 1 | 1 | 0 | 7970 | ok |
| meetup:bitcoinkarlsruhe | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8120 | ok |
| meetup:softwerkskammer-luebeck | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8483 | ok |
| meetup:kubernetes-meetup-bielefeld | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 7838 | ok |
| meetup:wpmeetup-stuttgart | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8030 | ok |
| meetup:chiemseebitcoinandblockchainmeetup | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8168 | ok |
| meetup:gamedevmuc | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8107 | ok |
| meetup:berlin-wordpress-meetup | noisy | 10 | 3 | 0 | 0 | 0 | 0 | 8111 | ok |
| meetup:makercube | noisy | 10 | 10 | 0 | 0 | 0 | 0 | 8153 | ok |
| meetup:rust-berlin | noisy | 10 | 9 | 9 | 9 | 9 | 0 | 8205 | ok |
| meetup:aibuildersclub | noisy | 10 | 10 | 10 | 10 | 10 | 0 | 8226 | ok |
| meetup:leipzig-python-user-group | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 7945 | ok |
| meetup:pycologne | noisy | 10 | 4 | 4 | 4 | 4 | 0 | 8109 | ok |
| meetup:freifunk-oberhausen | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8101 | ok |
| meetup:dresdenjs-io-javascript-user-group | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 7925 | ok |
| meetup:lalug-landshuter-linux-user-group-stammtisch | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8012 | ok |
| meetup:emerging-tech-rhein-main-community | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 8177 | ok |
| meetup:hamburg-c-net-meetup | noisy | 10 | 4 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:lorawan-leipzig-usergroup | noisy | 10 | 10 | 10 | 4 | 4 | 0 | 0 | ok |
| meetup:it-agile-community-events | noisy | 10 | 9 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:decentralized-trust-ruhrgebiet | noisy | 9 | 9 | 3 | 3 | 3 | 0 | 8204 | ok |
| meetup:munchen-ai-machine-learning-and-computer-vision-meetup | curated | 8 | 8 | 7 | 7 | 7 | 0 | 4595 | ok |
| meetup:betreute-intelligenz | curated | 8 | 4 | 4 | 4 | 4 | 0 | 8228 | ok |
| luma-frankfurt | noisy | 8 | 8 | 2 | 2 | 1 | 0 | 1955 | ok |
| meetup:bliss-speaker-series | curated | 7 | 7 | 7 | 7 | 7 | 0 | 8258 | ok |
| meetup:pirateskills | curated | 7 | 4 | 4 | 4 | 4 | 0 | 8111 | ok |
| meetup:ibm-developers | noisy | 7 | 7 | 7 | 2 | 0 | 0 | 8226 | ok |
| meetup:muenster-macht-agil | noisy | 7 | 7 | 0 | 0 | 0 | 0 | 8226 | ok |
| aieventlist-frankfurt | curated | 6 | 3 | 3 | 3 | 1 | 0 | 2862 | ok |
| gfw-warendorf | curated | 5 | 5 | 3 | 3 | 3 | 0 | 1475 | ok |
| meetup:berlin-software-engineering-leadership-meetup-group | noisy | 5 | 5 | 0 | 0 | 0 | 0 | 8007 | ok |
| mcml | curated | 4 | 4 | 3 | 3 | 3 | 0 | 582 | ok |
| hessian-ai | curated | 4 | 4 | 3 | 3 | 3 | 0 | 878 | ok |
| meetup:startup-factory-boost-network | noisy | 4 | 4 | 0 | 0 | 0 | 0 | 7863 | ok |
| meetup:hannover-unity-meetup | noisy | 4 | 4 | 0 | 0 | 0 | 0 | 8062 | ok |
| meetup:code-for-munster | noisy | 4 | 4 | 0 | 0 | 0 | 0 | 8239 | ok |
| meetup:spawnpoint | noisy | 4 | 4 | 0 | 0 | 0 | 0 | 7888 | ok |
| meetup:maikers-ai-community | curated | 3 | 3 | 3 | 3 | 3 | 0 | 8042 | ok |
| meetup:liberating-structures-user-group-rhein-main | noisy | 3 | 1 | 0 | 0 | 0 | 0 | 8072 | ok |
| meetup:node-code-frankfurt | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 7950 | ok |
| meetup:gdg-nuremberg | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 7752 | ok |
| meetup:gamedevtreff-ruhrpott | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 7543 | ok |
| meetup:it-security-kassel | noisy | 3 | 3 | 0 | 0 | 0 | 0 | 8057 | ok |
| meetup:pydata-berlin | curated | 2 | 2 | 2 | 2 | 2 | 0 | 357 | ok |
| meetup:ibmpoweraiberlin | curated | 2 | 2 | 2 | 2 | 2 | 0 | 5185 | ok |
| meetup:ai-agenten-frankfurt | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8048 | ok |
| meetup:ai-nights-nurnberg | curated | 2 | 2 | 2 | 2 | 2 | 0 | 8126 | ok |
| meetup:prompting-lab | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8079 | ok |
| aieventlist-hamburg | curated | 2 | 1 | 1 | 1 | 1 | 0 | 3649 | ok |
| aieventlist-stuttgart | curated | 2 | 2 | 2 | 2 | 2 | 0 | 5158 | ok |
| meetup:big-data-developers-in-berlin | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 7825 | ok |
| meetup:ibmpoweraifrankfurt | noisy | 2 | 2 | 2 | 2 | 0 | 0 | 8055 | ok |
| meetup:big-data-developers-in-munich | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8070 | ok |
| meetup:ibm-powerai-dusseldorf | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8012 | ok |
| meetup:main-valley | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 7887 | ok |
| meetup:digital-craftsmanship-nordoberpfalz | noisy | 2 | 1 | 1 | 1 | 1 | 0 | 7753 | ok |
| meetup:hannover-python-meetup | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8108 | ok |
| meetup:godot-stammtisch-karlsruhe | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7913 | ok |
| meetup:azure-serverless-koln | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 8012 | ok |
| meetup:the-test-tribe-frankfurt-meetup | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8082 | ok |
| meetup:ksug-in | noisy | 2 | 2 | 2 | 2 | 2 | 0 | 8078 | ok |
| meetup:berlinawsug | noisy | 2 | 2 | 1 | 1 | 1 | 0 | 8089 | ok |
| meetup:cologne-js | noisy | 2 | 2 | 0 | 0 | 0 | 0 | 7874 | ok |
| meetup:graphdb-dach | noisy | 2 | 2 | 2 | 2 | 1 | 0 | 0 | ok |
| meetup:pydata-hamburg | curated | 1 | 1 | 1 | 1 | 0 | 0 | 1176 | ok |
| meetup:ai-professionals-munich | curated | 1 | 1 | 1 | 1 | 0 | 0 | 2190 | ok |
| meetup:clickhouse-meetup-munich | curated | 1 | 1 | 1 | 1 | 1 | 0 | 8327 | ok |
| meetup:berlinai | curated | 1 | 1 | 1 | 1 | 1 | 0 | 7915 | ok |
| meetup:ai-agents-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7869 | ok |
| meetup:agentic-ai-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7808 | ok |
| meetup:bonner-ki-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8019 | ok |
| meetup:ai-school-leipzig | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7991 | ok |
| meetup:ai-cloud-innovation-karlsruhe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8049 | ok |
| meetup:kassel-data-science-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8027 | ok |
| meetup:artificial-intelligence-meetup-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7912 | ok |
| meetup:heidelberg-knowledge-graph-ai-hub | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8004 | ok |
| meetup:munich-snowflake-data-cloud-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8043 | ok |
| meetup:beads-berlin-ecosystem-for-analytics-and-data-systems | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7957 | ok |
| meetup:pass-microsoft-data-platform-usergroup-rheinland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7818 | ok |
| meetup:awsughh | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8042 | ok |
| meetup:ai-transformation-camp | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8047 | ok |
| aieventlist-cologne | curated | 1 | 1 | 1 | 1 | 0 | 0 | 4281 | ok |
| meetup:pydata-munchen | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 890 | ok |
| meetup:cybercologne-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8243 | ok |
| meetup:azure-bonn-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8024 | ok |
| meetup:jug-hamburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7547 | ok |
| meetup:gdg-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8088 | ok |
| meetup:net-user-group-karlsruhe | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7997 | ok |
| meetup:isaqb-software-architektur-meetup-gruppe-fur-interessierte | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8061 | ok |
| meetup:pass-usergroup-rhein-main | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7991 | ok |
| meetup:hamburger-indie-treff | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7982 | ok |
| meetup:give-a-go | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7811 | ok |
| meetup:padagility | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7977 | ok |
| meetup:berlindroid | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8131 | ok |
| meetup:berlinbanktechnights | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7969 | ok |
| meetup:frontend-meetup-freiburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8067 | ok |
| meetup:opentechschool-leipzig | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8090 | ok |
| meetup:rewe-digital-events-cologne | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8148 | ok |
| meetup:bochum-network-security-meetup-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7995 | ok |
| meetup:tech-meetup-sauerland | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8054 | ok |
| meetup:hack-the-box-meetup-leipzig-de | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8029 | ok |
| meetup:tech-talk-karlsruhe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8320 | ok |
| meetup:berlin-amazon-web-services-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8144 | ok |
| meetup:hackergarten-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8032 | ok |
| meetup:leaddev-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8009 | ok |
| meetup:audio-developer-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7900 | ok |
| meetup:opencoffeeclub_hamburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7517 | ok |
| meetup:robot-framework-usergroup-munsterland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7907 | ok |
| meetup:main-kinzig-nerds | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8276 | ok |
| meetup:rust-rhein-main | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7977 | ok |
| meetup:quality-engineering-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7807 | ok |
| meetup:do-dotnet | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8015 | ok |
| meetup:bergisches-entwicklerforum | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7903 | ok |
| meetup:cto-roundtable-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7869 | ok |
| meetup:tubingen-postgresql-meetup-group | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7776 | ok |
| meetup:42-shades-of-it | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7954 | ok |
| meetup:devops-freiburg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8025 | ok |
| meetup:afterwork-meetup-berlin | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8100 | ok |
| meetup:react-berlin-meetup | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8223 | ok |
| meetup:webmontag-kassel | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7989 | ok |
| meetup:hannovr | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8028 | ok |
| meetup:cybersecurity-stuttgart | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7994 | ok |
| meetup:aws-user-group-bodensee | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8026 | ok |
| meetup:erfurt-wordpress-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7965 | ok |
| meetup:cyberforum-e-v-karlsruhe-hightech-unternehmer-netzwerk | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7898 | ok |
| meetup:auditing-ai-beyond-the-prompt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7970 | ok |
| meetup:dortmund-aws-user-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8060 | ok |
| meetup:aws-usergroup-munsterland | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7958 | ok |
| meetup:digitalhubms | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7897 | ok |
| meetup:phpug-rhein-neckar | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7998 | ok |
| meetup:codecentric-dortmund-tech-talk | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8017 | ok |
| meetup:docker-black-forest | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7910 | ok |
| meetup:ddd-muc | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8007 | ok |
| meetup:php-usergroup-dresden | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7988 | ok |
| meetup:aachen-maker-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8019 | ok |
| meetup:ccdd-conciso-coding-dojo-dortmund | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7888 | ok |
| meetup:rethinking-ai-at-work | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7714 | ok |
| meetup:software-technology-meetup-pforzheim | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7914 | ok |
| meetup:gdg-hannover | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7921 | ok |
| meetup:bonn-bitcoin-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8029 | ok |
| meetup:scrumtisch-bonn | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7996 | ok |
| meetup:domain-driven-design-rhein-main | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8036 | ok |
| meetup:webwirtschaft | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7747 | ok |
| meetup:claude-meetup-frankfurt | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8017 | ok |
| meetup:global-ai-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7976 | ok |
| meetup:bass-hb | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8001 | ok |
| meetup:gamecreatorscologne | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7934 | ok |
| meetup:health-ai-munich | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7877 | ok |
| meetup:ki-klub-werder-havel | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 7981 | ok |
| meetup:obi-tech-talks | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8000 | ok |
| meetup:big-data-and-ai-saxony | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 8001 | ok |
| meetup:purple-elbe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7932 | ok |
| meetup:hamburg-powershell-user-group | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 8180 | ok |
| meetup:azure-dev-munich | noisy | 1 | 1 | 1 | 1 | 0 | 0 | 7903 | ok |
| meetup:aws-user-group-mannheim | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 7963 | ok |
| meetup:aws-usergroup-stuttgart | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:frankfurt-ai-safety | noisy | 1 | 1 | 1 | 1 | 1 | 0 | 0 | ok |
| meetup:wordpress-meetup-dortmund | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:c-user-gruppe-aachen | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:rustcologne | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:dusseldorf-wordpress-meetup | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:tech-kalinen-muensterland | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:identibeer-karlsruhe | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:grafana-friends-nuremberg | noisy | 1 | 1 | 0 | 0 | 0 | 0 | 0 | ok |
| meetup:munich-datageeks | curated | 0 | 0 | 0 | 0 | 0 | 0 | 3147 | empty |
| meetup:data-ai-meetup-koln | curated | 0 | 0 | 0 | 0 | 0 | 0 | 6163 | empty |
| meetup:data-visualization-meetup-hamburg | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7128 | empty |
| meetup:berlin-computer-vision-group | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7871 | empty |
| meetup:berlin-women-in-machine-learning-and-data-science | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7985 | empty |
| meetup:kaggle-berlin | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7950 | empty |
| meetup:data-science-and-ai-frankfurt | curated | 0 | 0 | 0 | 0 | 0 | 0 | 8084 | empty |
| meetup:applydata-munich | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7594 | empty |
| meetup:hamburg-data-science-meetup | curated | 0 | 0 | 0 | 0 | 0 | 0 | 7949 | empty |
| meetup:sovereign-ai-meetup-ulm | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7819 | empty |
| meetup:fra_aws | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7578 | empty |
| eventbrite-berlin | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-munich | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-cologne | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-hamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| eventbrite-stuttgart | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 0 | disabled: Eventbrite answers HTTP 405 from GitHub Actions IPs and 429 locally, even with an honest User-Agent and 2 s spacing; not bypassing the block. Re-enable after checking again. |
| startupcity-hamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 779 | empty |
| meetup:grafana-friends-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 1933 | empty |
| meetup:producttank-nuernberg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 2908 | empty |
| meetup:tech-talk-stuttgart | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 3093 | empty |
| meetup:owasp-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 4947 | empty |
| meetup:wtm-berlin | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 5707 | empty |
| meetup:producttank-munich | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 5851 | empty |
| meetup:azure-dusseldorf-meetup | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 6755 | empty |
| meetup:openmates-meetup-group | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 6808 | empty |
| meetup:inovex-meetup-erlangen | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7724 | empty |
| meetup:django-cologne | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7883 | empty |
| meetup:mannheim-java-usergroup | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7868 | empty |
| meetup:bochum-meetup-and-explore-the-community-meetup-group | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7894 | empty |
| meetup:google-developers-group-munster | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7904 | empty |
| meetup:wpmeetup-potsdam | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7996 | empty |
| meetup:checkmk-munich-group | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7999 | empty |
| meetup:devtalk-tk | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7975 | empty |
| meetup:womentechmakershamburg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8079 | empty |
| meetup:meetup-group-pnulfhzz | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7980 | empty |
| meetup:prodot-insights | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7946 | empty |
| meetup:cloud-native-munster | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7990 | empty |
| meetup:meetup-group-igafblfy | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7704 | empty |
| meetup:meetup-group-tfyvuydp | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7860 | empty |
| meetup:cloud-native-night | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8004 | empty |
| meetup:leipzig-golang | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8065 | empty |
| meetup:nordic-coding | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7995 | empty |
| meetup:rust-dortmund | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8010 | empty |
| meetup:jug-nurnberg | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7980 | empty |
| meetup:le-software-craft-community | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8056 | empty |
| meetup:tech-talk-muenster | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7935 | empty |
| meetup:opensource-ruhr | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7930 | empty |
| meetup:scrum-user-group-karlsruhe | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7794 | empty |
| meetup:berlincplusplus | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7981 | empty |
| meetup:llvm-social-darmstadt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8014 | empty |
| meetup:lean-coffee-karlsruhe-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7893 | empty |
| meetup:aws-user-group-bergstrasse | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7992 | empty |
| meetup:modern-work-munster | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7941 | empty |
| meetup:leaddev-meetup-munich | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8079 | empty |
| meetup:gemeinsam-mit-ki-koeln | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8169 | empty |
| meetup:php-user-group-stuttgart | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7974 | empty |
| meetup:elixir-ruhr-dev | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7867 | empty |
| meetup:owasp-cologne-chapter | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7833 | empty |
| meetup:lean-agile-sh | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7928 | empty |
| meetup:owasp-augsburg-chapter | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 7890 | empty |
| meetup:tech-n-talk-frankfurt | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8022 | empty |
| meetup:ai-knowledge-worker-meetup-leipzig | noisy | 0 | 0 | 0 | 0 | 0 | 0 | 8017 | empty |

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
| scrape:allai | ready | 20476 | 36 |  |

## Per city (after dedupe)

| city group | clusters | known | new |
| --- | --- | --- | --- |
| Berlin | 82 | 80 | 2 |
| Other Germany | 63 | 59 | 4 |
| Munich | 47 | 46 | 1 |
| Hamburg | 36 | 36 | 0 |
| Unknown | 34 | 31 | 3 |
| Frankfurt | 22 | 20 | 2 |
| Cologne | 20 | 20 | 0 |
| Stuttgart | 8 | 6 | 2 |
| Online (DE) | 8 | 7 | 1 |

Places inside "Other Germany" (after dedupe): Leipzig 16, Nuremberg 10, Hanover 6, Karlsruhe 4, Heidelberg 4, Warendorf 4, Münster 3, Dortmund 3, Dresden 3, Freiburg 2, Chemnitz 2, Fürth 1, Kassel 1, Gelnhausen 1, Halle 1

## Dropped by filters (all sources)

| reason | count |
| --- | --- |
| country | 837 |
| keyword | 504 |
| window | 397 |
| long | 4 |

## 10 largest dedupe clusters

| members | title | sources |
| --- | --- | --- |
| 11 | IBM Bob Coding Watch Party in Berlin & Online | meetup:ibmpoweraiberlin, meetup:big-data-developers-in-berlin, meetup:ibmpoweraifrankfurt, meetup:ibm-developers, hackevents-ai, hackevents-data |
| 7 | AI Coding Summit Berlin | meetup:berlinai, agentconfs, brainberg, hackevents-ai, aieventlist-berlin, aieventlist-europe |
| 6 | DevFest Munich 2026 - Munich Innovates: AI, Cloud & Beyond | meetup:gdg-munich, brainberg, hackevents-ai, hackevents-data, aieventlist-munich, aieventlist-europe |
| 6 | DATA festival 2027 | deutschlandki, agentconfs, hackevents-ai, hackevents-data, aieventlist-munich, aieventlist-europe |
| 5 | AI Builders Hamburg - Bring Your Own Laptop Edition - Dec 3 | meetup:aibuildersclub, hackevents-ai, hackevents-data, brainberg |
| 5 | #0XX Bastelrunde - Event Driven Development | meetup:lorawan-leipzig-usergroup, brainberg |
| 4 | Bob TV Episode 4: Why generic AI fails at mainframe scale - and what works | meetup:ibmpoweraiberlin, meetup:big-data-developers-in-berlin, meetup:ibmpoweraifrankfurt, meetup:ibm-developers |
| 4 | AI hackathon @ reply | meetup:maikers-ai-community, meetup:graphdb-dach, hackevents-ai, brainberg |
| 4 | Mit Agenten das Zuhause managen | meetup:agentic-ai-frankfurt, luma-frankfurt, hackevents-ai, brainberg |
| 4 | build fridays - work on your startup alongside other founders (bring laptop) | meetup:ai-beavers, luma-hamburg, brainberg, hackevents-ai |

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
- meetup:sovereign-ai-meetup-ulm: empty (0 items)
- meetup:fra_aws: empty (0 items)
- startupcity-hamburg: empty (0 items, 30 raw) - feed items carry no event date (pubDate is the publish date); needs a per-page fetch
- WARNING meetup:munich-datageeks: returned zero items after 7 days of items
- WARNING meetup:hamburg-data-science-meetup: returned zero items after 7 days of items
- WARNING meetup:fra_aws: returned zero items after 7 days of items
- WARNING meetup:grafana-friends-frankfurt: returned zero items after 7 days of items
- WARNING meetup:inovex-meetup-erlangen: returned zero items after 7 days of items
- WARNING meetup:modern-work-munster: returned zero items after 7 days of items
- WARNING meetup:leaddev-meetup-munich: returned zero items after 7 days of items
- WARNING meetup:gemeinsam-mit-ki-koeln: returned zero items after 7 days of items
- WARNING meetup:php-user-group-stuttgart: returned zero items after 7 days of items
- WARNING meetup:elixir-ruhr-dev: returned zero items after 7 days of items
- WARNING meetup:owasp-cologne-chapter: returned zero items after 7 days of items
- WARNING meetup:lean-agile-sh: returned zero items after 7 days of items

## Meetup group discovery

- aws-usergroup-stuttgart: ICS ok
- frankfurt-ai-safety: ICS ok
- wordpress-meetup-dortmund: ICS ok
- hamburg-c-net-meetup: ICS ok
- c-user-gruppe-aachen: ICS ok
- rustcologne: ICS ok
- graphdb-dach: ICS ok
- dusseldorf-wordpress-meetup: ICS ok
- lorawan-leipzig-usergroup: ICS ok
- tech-kalinen-muensterland: ICS ok
- identibeer-karlsruhe: ICS ok
- it-agile-community-events: ICS ok
- grafana-friends-nuremberg: ICS ok

## Notes

- Ledger/ health/ cache files written; elapsed 222 s.
