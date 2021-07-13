#!/bin/bash


## {"type":"auditSummary","data":{"vulnerabilities":{"info":0,"low":357,"moderate":719,"high":814,"critical":0},"dependencies":1406,"devDependencies":0,"optionalDependencies":0,"totalDependencies":1406}}
file=audit/audit-results-npm.json
info=$(jq '.metadata.vulnerabilities.info' $file)
low=$(jq '.metadata.vulnerabilities.low' $file)
moderate=$(jq '.metadata.vulnerabilities.moderate' $file)
high=$(jq '.metadata.vulnerabilities.high' $file)
critical=$(jq '.metadata.vulnerabilities.critical' $file)


dependencies=$(jq '.metadata.dependencies' $file)
devDependencies=$(jq '.metadata.devDependencies' $file)
optionalDependencies=$(jq '.metadata.optionalDependencies' $file)
totalDependencies=$(jq '.metadata.totalDependencies' $file)


rows="%-22s %7s\n"
echo "---Vulnerability check by npm summary---"
printf "\n$rows" "Dependencies:" "$dependencies"
printf "$rows" "Dev Dependencies:" "$devDependencies"
printf "$rows" "Optional Dependencies:" "$optionalDependencies"
printf "\n%22s %7s\n" "Total:" "$totalDependencies"
echo "========================================"
rows="%22s %7s\n"
printf "\n%s\n" "Vulnerabilities:"
printf "$rows" "info:" "$info"
printf "$rows" "low:" "$low"
printf "$rows" "moderate:" "$moderate"
printf "$rows" "high:" "$high"
printf "$rows" "critical:" "$critical"
echo "----------------------------------------"