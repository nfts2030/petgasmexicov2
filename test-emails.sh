#!/bin/bash

# Script para probar los endpoints de email en producción
# Uso: ./test-emails.sh

BASE_URL="https://petgasmexico-v2.vercel.app"

echo "🧪 Testing Email Endpoints - PETGAS México"
echo "=========================================="
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar resultados
show_result() {
    local endpoint=$1
    local status=$2
    local response=$3

    echo -e "${BLUE}Testing: ${endpoint}${NC}"

    if [[ $status -eq 200 ]]; then
        echo -e "Status: ${GREEN}✅ $status${NC}"
    else
        echo -e "Status: ${RED}❌ $status${NC}"
    fi

    # Parse JSON response for key info
    if command -v jq &> /dev/null; then
        echo "Response:"
        echo "$response" | jq '.'
    else
        echo "Response: $response"
    fi
    echo ""
}

# Test 1: Diagnose Email (sin enviar email real)
echo -e "${YELLOW}🔍 Test 1: Email Diagnostics${NC}"
response1=$(curl -s -w "HTTPSTATUS:%{http_code}" \
    -X POST "$BASE_URL/api/diagnose-email" \
    -H "Content-Type: application/json" \
    -d '{"sendTestEmail": false}')
http_code1=$(echo $response1 | grep -o "HTTPSTATUS:[0-9]*" | cut -d: -f2)
body1=$(echo $response1 | sed -E 's/HTTPSTATUS:[0-9]*$//')
show_result "/api/diagnose-email" $http_code1 "$body1"

# Test 2: Test Email (simple connection test)
echo -e "${YELLOW}📧 Test 2: SMTP Connection Test${NC}"
response2=$(curl -s -w "HTTPSTATUS:%{http_code}" \
    -X POST "$BASE_URL/api/test-email")
http_code2=$(echo $response2 | grep -o "HTTPSTATUS:[0-9]*" | cut -d: -f2)
body2=$(echo $response2 | sed -E 's/HTTPSTATUS:[0-9]*$//')
show_result "/api/test-email" $http_code2 "$body2"

# Test 3: Contact Form (original)
echo -e "${YELLOW}📝 Test 3: Original Contact Form${NC}"
response3=$(curl -s -w "HTTPSTATUS:%{http_code}" \
    -X POST "$BASE_URL/api/contact" \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Test User",
        "email": "test@example.com",
        "phone": "555-1234",
        "subject": "cotizacion",
        "message": "Este es un mensaje de prueba del script de testing.",
        "privacy": true
    }')
http_code3=$(echo $response3 | grep -o "HTTPSTATUS:[0-9]*" | cut -d: -f2)
body3=$(echo $response3 | sed -E 's/HTTPSTATUS:[0-9]*$//')
show_result "/api/contact" $http_code3 "$body3"

# Test 4: Contact Form V2 (new version)
echo -e "${YELLOW}📝 Test 4: New Contact Form (v2)${NC}"
response4=$(curl -s -w "HTTPSTATUS:%{http_code}" \
    -X POST "$BASE_URL/api/contact-v2" \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Test User V2",
        "email": "test.v2@example.com",
        "phone": "555-5678",
        "subject": "ventas",
        "message": "Este es un mensaje de prueba del nuevo endpoint v2.",
        "privacy": true
    }')
http_code4=$(echo $response4 | grep -o "HTTPSTATUS:[0-9]*" | cut -d: -f2)
body4=$(echo $response4 | sed -E 's/HTTPSTATUS:[0-9]*$//')
show_result "/api/contact-v2" $http_code4 "$body4"

# Test 5: Contact Form con SendGrid (si está disponible)
if [[ ! -z "$SENDGRID_API_KEY" ]]; then
    echo -e "${YELLOW}📧 Test 5: SendGrid Contact Form${NC}"
    response5=$(curl -s -w "HTTPSTATUS:%{http_code}" \
        -X POST "$BASE_URL/api/contact-sendgrid" \
        -H "Content-Type: application/json" \
        -d '{
            "name": "Test SendGrid User",
            "email": "test.sendgrid@example.com",
            "phone": "555-9999",
            "subject": "soporte",
            "message": "Mensaje de prueba para SendGrid.",
            "privacy": true
        }')
    http_code5=$(echo $response5 | grep -o "HTTPSTATUS:[0-9]*" | cut -d: -f2)
    body5=$(echo $response5 | sed -E 's/HTTPSTATUS:[0-9]*$//')
    show_result "/api/contact-sendgrid" $http_code5 "$body5"
else
    echo -e "${YELLOW}⚠️  Skipping SendGrid test (no API key in environment)${NC}"
    echo ""
fi

# Summary
echo "=========================================="
echo -e "${BLUE}📊 SUMMARY${NC}"
echo "=========================================="

# Count successes
success_count=0
total_tests=4

if [[ $http_code1 -eq 200 ]]; then ((success_count++)); fi
if [[ $http_code2 -eq 200 ]]; then ((success_count++)); fi
if [[ $http_code3 -eq 200 ]]; then ((success_count++)); fi
if [[ $http_code4 -eq 200 ]]; then ((success_count++)); fi

if [[ ! -z "$SENDGRID_API_KEY" ]]; then
    total_tests=5
    if [[ $http_code5 -eq 200 ]]; then ((success_count++)); fi
fi

echo "Tests passed: $success_count/$total_tests"

if [[ $success_count -eq $total_tests ]]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Some tests failed. Check the logs above.${NC}"
    exit 1
fi
