# 블록체인 기반 정품 인증 서비스 기획 Repository

## 1. Repository 소개

본 Repository는 Product Owner가 신규 서비스인 **블록체인 기반 정품 인증 서비스**를 기획하고, 「모두의 창업 프로젝트」 등 창업지원사업 제출을 위한 사업계획 및 제품기획 산출물을 관리하기 위한 프로젝트 Repository다.

서비스의 Business Context, 정책, 고객여정, Information Architecture(IA), Business Requirement(BR), Product Requirement(PR) 등의 기획 산출물을 **Markdown + Git** 기반으로 관리한다.

또한 AI Agent를 활용하여 산출물의 작성·검토·변경 영향 분석 및 추적을 지원한다.

---

## 2. Product

**블록체인 기반 정품 인증 서비스**는 실물 제품의 정품 여부와 유통 이력을 블록체인 기반으로 검증하는 서비스다.

서비스의 상세 정의는 `BR/01-서비스개요.md`에서 관리하며, 그 밖의 Business Context는 각 문서에서 관리한다.

---

## 3. Repository 구조

```
/
├── README.md
├── CLAUDE.md
├── BR/
│   ├── 01-서비스개요.md
│   ├── 02-서비스배경.md
│   ├── 03-범위.md
│   ├── 04-이해관계자.md
│   ├── 05-역할.md
│   ├── 06-페르소나.md
│   ├── 07-고객여정/
│   ├── 08-정책/
│   ├── 09-요구사항.md
│   ├── 10-IA/
│   └── 11-open issues.md
├── PR/
├── 원천자료/
├── 참고자료/
└── 규칙/
    ├── 01-ID 스키마.md
    └── 02-추적성.md
```

각 영역은 자신의 책임 범위에 해당하는 내용을 관리하며, 상세 작성 및 AI Agent 작업 기준은 해당 영역의 `CLAUDE.md`와 `규칙/`을 따른다.

---

## 4. 주요 문서 및 영역

| 문서 / 영역 | 주요 책임 |
| --- | --- |
| `BR/01-서비스개요.md` | 서비스의 정의, 기능, 범위 |
| `BR/02-서비스배경.md` | 서비스의 배경(문제·기회·비즈니스 필요성) |
| `BR/03-범위.md` | 현재 분석 및 기획 범위 |
| `BR/04-이해관계자.md` | 서비스 이해관계자 및 참여 주체 |
| `BR/05-역할.md` | 서비스 및 업무 과정의 역할 |
| `BR/06-페르소나.md` | 고객 페르소나 |
| `BR/07-고객여정/` | 고객 및 필요한 역할의 주요 여정 |
| `BR/08-정책/` | 상품·서비스·운영 정책 |
| `BR/09-요구사항.md` | Business Requirement |
| `BR/10-IA/` | 정보 및 기능 구조 |
| `BR/11-open issues.md` | 미결 사항 단일 관리 |
| `PR/` | Product Requirement |
| `원천자료/` | 사업 아이디어의 사실·근거를 확인하기 위한 Source |
| `참고자료/` | 서비스 분석 및 기획을 위한 보조 자료 |
| `규칙/` | Repository 공통 운영 및 작성 규칙 |

---

## 5. Source 관리

### 5.1 원천자료

`원천자료/`는 서비스 아이디어의 시장성·기술적 타당성을 뒷받침하는 공식 또는 객관적 근거 자료를 관리한다.

예시는 다음과 같다.

* 「모두의 창업 프로젝트」 등 지원사업 공고문 및 제출 양식
* 관련 법령·제도 (전자상거래, 블록체인/전자문서 관련 규정 등)
* 시장조사 자료 (정품 인증·위변조 방지 시장 규모 및 동향)
* 유사·경쟁 서비스 벤치마킹 자료
* 블록체인/NFC/QR 관련 기술 자료 및 특허
* 기타 사업 아이디어의 사실관계를 확인할 수 있는 공식 자료

원천자료(특히 벤치마킹 자료)에 특정 기능이나 동작이 정의되어 있다는 이유만으로 이를 향후 Business Requirement 또는 Product Requirement로 간주하지 않는다.

---

### 5.2 참고자료

`참고자료/`는 서비스 분석 및 기획 과정에서 참고하기 위해 작성하거나 수집한 보조 자료를 관리한다.

예시는 다음과 같다.

* 서비스 분석 자료
* 시스템 분석 자료
* 경쟁 서비스 조사
* 업무 분석 자료
* 내부 정리 자료

참고자료는 원천자료와 동일한 수준의 사실 근거로 간주하지 않는다.

---

## 6. 산출물 관계

본 Repository의 산출물은 파일 번호나 작성 순서가 아니라 **실제 근거와 파생 관계**를 기준으로 관리한다.

```
Business Context
      ↓
Business Requirement
      ↓
Product Requirement
```

Business Requirement는 서비스 개요, 서비스 배경, 범위, 페르소나, 이해관계자, 역할, 고객여정, 정책 등 필요한 Business Context를 근거로 도출한다.

Product Requirement는 상위 Business Requirement를 기반으로 제품 수준의 요구사항으로 구체화한다.

구체적인 추적 관계와 `based_on` 사용 기준 및 변경 영향 추적 방법은 `규칙/02-추적성.md`를 따른다.

ID의 형식과 번호 부여 기준은 `규칙/01-ID 스키마.md`를 따른다.

---

## 7. Repository 운영 원칙

본 Repository는 다음 원칙을 중심으로 운영한다.

### 책임 분리

각 Business Context와 산출물은 정의된 책임 문서에서 관리한다.

동일한 내용을 여러 문서에서 불필요하게 중복 관리하지 않는다.

### 근거 기반

사업 아이디어와 서비스의 사실·타당성은 관련 Source를 통해 확인한다.

### 추적성

Business Context에서 Business Requirement가 도출되고, Product Requirement는 상위 Business Requirement를 기반으로 구체화한다.

관련 문서 및 Requirement 간 관계는 추적 가능하게 관리한다.

### 변경 영향 관리

Business Context, 정책 또는 Requirement가 변경되는 경우 관련 문서와 상·하위 Requirement에 미치는 영향을 함께 확인한다.

### Human-in-the-Loop

AI Agent는 기획 업무를 지원하지만 주요 판단 및 승인 지점은 PO의 확인을 거친다.

---

## 8. AI Agent

본 Repository는 AI Agent를 활용하여 다음 업무를 지원한다.

* 사업 아이디어 및 Source 분석
* Business Context 작성 및 검토
* Business Requirement 작성 및 검토
* Product Requirement 작성 및 검토
* Requirement 추적성 검증
* 변경 영향 분석
* 미결 사항 식별

AI Agent의 Persona, Context 탐색 방법, 판단 기준 및 작업 원칙은 루트 `CLAUDE.md`에서 관리하며, 영역별 지침이 필요한 경우 해당 영역의 `CLAUDE.md`에서 관리한다.

---

## 9. 상세 규칙

Repository의 상세 운영 규칙은 `규칙/`에서 관리한다.

주요 규칙은 다음과 같다.

* `규칙/01-ID 스키마.md`
* `규칙/02-추적성.md`

각 디렉터리에 별도의 `CLAUDE.md`가 존재하는 경우 해당 영역에서 AI Agent가 작업할 때는 가장 가까운 `CLAUDE.md`의 지침을 따른다.