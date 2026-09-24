# NXP NTAG 424 DNA 기술 자료

서명 기능이 있는 NFC 칩의 대표 사례로 NXP NTAG 424 DNA의 공개 자료를 정리한다. 서비스의 칩 스캔 조회 방식을 검토하기 위한 기술 근거이며, 칩 종류를 확정하는 자료는 아니다.

## 출처

| 번호 | 자료 | 발행처 | 링크 | 접근일 | 확인 수준 |
| --- | --- | --- | --- | --- | --- |
| 1 | NTAG 424 DNA 제품 페이지 | NXP Semiconductors | https://www.nxp.com/products/rfid-nfc/nfc-hf/ntag-for-tags-and-labels/ntag-424-dna-424-dna-tagtamper-advanced-security-and-privacy-for-trusted-iot-applications:NTAG424DNA | 2026-09-24 | 공식 자료, 검색 결과 요약 기준(본문 미조회) |
| 2 | NTAG 424 DNA 데이터시트 | NXP Semiconductors | https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf | 2026-09-24 | 공식 자료, 검색 결과에서 링크만 확인 |
| 3 | Enhancing Product Authentication with NXP NTAG424 DNA | rfidcard.com | https://www.rfidcard.com/enhancing-product-authentication-with-nxp-ntag424-dna/ | 2026-09-24 | 태그 판매업체 자료(2차), 검색 결과 요약 기준 |

## 확인된 내용

| 항목 | 내용 | 출처 |
| --- | --- | --- |
| 암호 | AES-128 암호 연산 지원. 대안으로 LRP 방식의 AES 프로토콜 | 1, 3 |
| 스캔 인증 | 스캔할 때마다 고유한 인증 메시지(SUN, Secure Unique NFC message)를 생성 | 1, 3 |
| 검증 방식 | 폰이 태그가 만든 URL을 읽어 서버로 보내면 서버가 태그와 메시지를 인증하고 결과를 돌려줌 | 3 |
| 위조 방지 | 매 스캔마다 값이 달라져 위조자가 복제하기 어렵다고 설명 | 3 |
| 파손 감지 | TagTamper 변형은 태그의 물리적 개봉·훼손 여부를 감지 | 1 |
| 기기 지원 | Android는 별도 앱 없이 SUN 인증이 동작. iOS는 iOS 11 이상에서 앱을 사용하는 방식으로 설명됨 | 3 |

## 확인되지 않은 내용

* 칩·라벨의 단가와 최소 주문 수량
* iOS에서 앱 없이 스캔 결과를 웹으로 연결할 수 있는지 여부(2차 자료는 앱 사용으로 서술)
* 의류 라벨, 신발 내부 등 제품 종류별 내장 방식과 내구성
* 파손 감지 기능이 있는 변형(TagTamper)의 제품 적용 방법

## 참고

* 공식 자료 본문을 직접 조회하지 못했다. 인용 전에 NXP 데이터시트와 제품 페이지에서 사양을 확인한다.
* iOS 지원 방식은 서비스의 모바일 앱 제외 범위와 관련이 있어 별도 확인이 필요하다.
