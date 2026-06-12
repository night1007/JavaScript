# AIVLE_Mini-Project_4
AI 책 표지 자동 생성 기반 도서 관리 시스템
미니프로젝트 4차 20조

> **KT AIVLE School 4차 미니프로젝트**
> React 프론트엔드와 가상 REST API 서버(`json-server`)를 연동하여 도서 데이터를 관리하고, OpenAI 이미지 생성 API를 통해 내용 기반의 AI 책 표지를 자동 생성하는 웹 애플리케이션

## Role
| 이름 | 주 역할 (Role) | 담당 기능 및 파트 (Details) | 비고 |
| :---: | :---: | :--- | :---: |
| **이성호** | 👑 조장 / PM | 프로젝트 총괄 관리, 서비스 배포 환경 구축 | |
| **김나현** | 💻 Back-end (API) | 도서 등록 및 수정 기능 개발 (`POST`, `PATCH`) | 발표 자료 작성 |
| **이수연** | 💻 Back-end (API) | 도서 목록/상세 조회 및 삭제 기능 개발 (`GET`, `DELETE`) | 발표 자료 작성 |
| **이영창** | 🤖 AI Engineer | OpenAI API 프롬프트 엔지니어링 및 외부 연동 파이프라인 구축 | 발표 진행 |
| **윤서영** | 🤖 AI Engineer | AI 생성 이미지 데이터 인코딩 변환 및 DB 구조 매핑 | 서기 |
| **김민정** | 🎨 UI/UX Designer | 프론트엔드 와이어프레임 설계 및 컴포넌트 스타일링 구현 | |
| **송지수** | 🎨 UI/UX Designer | 프론트엔드 와이어프레임 설계 및 컴포넌트 스타일링 구현 | |

---

## System Environment
* **Client:** React (Vite 기반 SPA 개발 환경)
* **Backend & DB:** `json-server` (Port: `3000`) ➡️ 로컬 `db.json` 파일에 데이터 영구 저장
* **External AI API:** OpenAI 이미지 생성 API (`gpt-image-2` 모델 규격 적용)

---

## 핵심 기능 가이드 (Features & Functionalities)

### 1. 스마트 도서 대시보드 (Book Dashboard)

- **실시간 도서 로드 (REQ-001, REQ-002):** 웹 애플리케이션에 접속하는 즉시 로컬 가상 데이터베이스(`json-server`)와 비동기 통신을 수행하여 등록된 모든 도서 목록을 메인 화면에 그리드 형태로 안전하게 출력
- **검색 및 다중 카테고리 필터 (REQ-004):** 자바스크립트 내장 함수인 `Array.prototype.filter()`를 활용하여, 제목 및 저자 명에 기반한 키워드 검색과 소설/인문학 등의 장르별 태그 필터링을 실시간 리렌더링으로 지원
- **클라이언트 사이드 페이지네이션 (REQ-005):** 한 번에 너무 많은 도서가 로드되어 브라우저 성능이 저하되는 현상을 방지하기 위해 1페이지당 노출 데이터 수를 **6개**로 엄격히 제한하고, `slice()` 메서드를 활용한 분할 네비게이션을 구현

### 2. 직관적인 도서 등록 및 유효성 검증 (Book Registration)

- **유효성 검사 서포트 (REQ-003, REQ-006, REQ-008):** 도서 등록 버튼을 클릭하면 컴포넌트 라우팅을 통해 입력 폼으로 전환되며, 저장 시 공백이나 누락된 필드가 없도록 프론트엔드 단에서 강력한 필수 값 검증(Validation)을 수행
- **안전한 데이터 적재 (REQ-007, DOC-001):** 유효성 검사를 통과한 데이터는 고유 ID, 생성일자(`createdAt`) 정보와 함께 구조화된 페이로드로 매핑되어 백엔드 서버에 성공적으로 안정적 기록(`POST`)을 완료
- **AI 기반 태그 자동 생성 (REQ-009):** 사용자가 도서 줄거리를 길게 작성하면, OpenAI API가 본문 맥락을 인공지능으로 분석하여 정해진 도서 분류 체계 안에서 가장 적합한 카테고리 태그를 최대 3개까지 추출하여 자동으로 태깅

### 3. 상세 정보 조회 및 편집 시스템 (View & Edit Management)

- **단일 엔티티 상세 라우팅 (REQ-010, REQ-011):** 목록에서 특정 도서를 클릭하면 해당 도서의 고유 ID 값을 쿼리 매개변수로서 상세 페이지로 진입하면서 제목·저자·줄거리·AI 책 표지 일러스트 등의 메타데이터를 출력
- **동적 인라인 편집 모드 (REQ-012, REQ-013):** '수정' 버튼 클릭 시 별도의 화면 이동 없이 입력 필드가 활성화되는 동적 컴포넌트 모드 전환 기술을 채택했고, 수정 완료 시 변경 사항과 수정 시점(`updatedAt`)을 함께 매핑하여 반영(`PATCH`)
- **오클릭 방지 삭제 인터랙션 (REQ-014):** '삭제' 버튼을 누를 경우 브라우저 팝업 경고(Confirm alert)창을 먼저 실행하여 사용자의 실수로 인한 데이터 유실을 방지하고, 승인 시 안전하게 데이터를 삭제(`DELETE`).

### 4. 핵심 AI 맞춤형 표지 생성 (AI Cover Generation)

- **화질 제어 및 API 통신 (REQ-015):** 상세 페이지 내부에서 개인 OpenAI API 키를 직접 입력하고 원하는 표지 이미지의 해상도 옵션(Low / Medium / High 콤보 박스)을 유연하게 조절하여 서버에 요청을 송신하도록 유도
- **줄거리 기반 키워드 이미지 변환 (REQ-016):** 가동된 AI 엔진은 도서 본문 시나리오의 전체적인 분위기, 주인공 정보, 핵심 사건 등의 텍스트 맥락을 완벽히 파악하여 세상에 단 하나뿐인 책 표지 그래픽을 설계
- **중복 방지 런타임 비활성화 (REQ-017):** 비동기 API 요청이 들어간 순간 버튼 텍스트가 즉시 `'생성 중...'`으로 스위칭되며 완료 전까지 모든 클릭 제어권을 잠금(`disabled`) 처리하여 다중 호출로 인한 서버 낭비 방지
- **실시간 인코딩 반영 (REQ-018):** 성공적으로 생성된 이미지 데이터는 즉각 바이너리 base64 형태로 전달되어 메인 목록 대시보드와 상세 뷰 스크린 영역 전체에 걸쳐 지연 없이 실시간 실사 화면으로 리렌더링 및 동기화

## 요구사항 정의서
[요구사항 정의서 - 도서 관리 및 AI 표지 생성 시스템.pdf](https://github.com/user-attachments/files/28297107/-.AI.pdf)

---

## 디렉토리 구조
```
AIVLE_Mini-Project_4/
├── node_modules/          
├── mock.json  
└── src/
    ├── components/                  # [UI 컴포넌트] 재사용 가능한 레고 블록 단위
    │   ├── BookToListButton.jsx     # 목록으로 돌아가는 버튼 컴포넌트
    │   ├── BookDetail.jsx           # 도서 상세 내역 마크업 및 스타일
    │   ├── BookForm.jsx             # 도서 추가/수정용 순수 입력 폼 UI
    │   ├── BookItem.jsx             # 목록에서 쓰일 개별 도서 카드 UI
    │   ├── BookList.jsx             # 헤더 UI
    │   ├── Header.jsx             # 목록에서 쓰일 개별 도서 카드 UI
    │   └── Pagination.jsx           # 페이지네이션 컴포넌트
    │
    ├── screens/                     # [스크린] 독립적인 하나의 완성된 페이지 단위
    │   ├── BookAddScreen.jsx        # 도서 등록 페이지
    │   ├── BookEditScreen.jsx       # 도서 수정 기능
    │   ├── BookInfoScreen.jsx       # 도서 상세 조회 페이지
    │   └── HomeScreen.jsx           # 메인 대시보드/목록 페이지
    │
    ├── App.css                      # 전역 스타일시트
    ├── App.jsx                      # 실전용 최상위 데이터 통신 컨트롤러
    ├── AppMockTest.jsx              # [Mock]오프라인 자동 검증용 테스트 라우터
    └── main.jsx                     # 리액트 앱 진입점 및 스위치 (BrowserRouter 포함)
├── .gitignore                       # Git 추적 제외 설정 파일
├── .env                             # api key 등 환경 변수 파일
├── index.html                       # SPA 메인 HTML 뼈대 파일
├── package.json                     # 의존성 라이브러리 및 스크립트 설계도
├── package-lock.json                # 의존성 잠금 파일 (버전 고정)
└── vite.config.js                   # Vite 빌드 및 개발 서버 설정 파일
```

## DB 구조
```
{
  "books": [
    {
      "id": "시스템 자동 생성 ID (String 또는 Number)",
      "title": "도서 제목 (String)",
      "author": "저자명 (String)",
      "content": "도서 본문 내용 (String)",
      "coverImageUrl": "AI로 생성된 이미지의 Data URL (String)",
      "tags":["tag1", "tag2", "tag3"],
      "createdAt": "생성일자 (String / YYYY-MM-DD HH:mm)",
      "updatedAt": "수정일자 (String / YYYY-MM-DD HH:mm)"
    }
  ]
}
```
---

## 아키텍처 및 데이터 흐름 명세
1. **기본 CRUD 흐름:** React 브라우저와 `json-server` 간의 REST API 통신을 통해 `db.json` 데이터를 실시간으로 관리.
2. **AI 표지 생성 및 반영 흐름 (4-Step):**
   * **Step 1 (요청):** 도서 내용(`content`)을 기반으로 커스텀 프롬프트를 조립하여 OpenAI API에 전송 (`POST`)
   * **Step 2 (수신):** OpenAI 서버로부터 Base64 데이터(`b64_json`) 수신
   * **Step 3 (변환):** 브라우저가 직접 렌더링하고 저장할 수 있는 `Data URL` 포맷 스트링으로 즉시 인코딩
   * **Step 4 (갱신):** `PATCH /books/${id}` 요청을 통해 `db.json` 내 해당 도서의 `coverImageUrl` 필드만 타겟팅하여 부분 업데이트 후 화면 동기화

## API 명세서
| 기능 | 메서드 | 경로 | 담당자 |
| :--- | :---: | :--- | :--- |
| 책 목록 조회 | GET | `/books` | 이수연 |
| 책 상세 조회 | GET | `/books/:id` | 이수연 |
| 책 추가 | POST | `/books` | 김나현 |
| 책 수정 | PATCH | `/books/:id` | 김나현 |
| 책 삭제 | DELETE | `/books/:id` | 이수연 |

###  HTTP status code
| 코드 | 설명 |
| :---: | :--- |
| **200** | 정상 / 성공 |
| **400** | 잘못된 요청 |
| **404** | 데이터 없음 |
| **429** | Rate Limit |
| **500** | 서버 오류 |

---
## Flow chart
<p>
<img width="5288" height="4440" alt="Image" src="https://github.com/user-attachments/assets/b382c558-7888-4434-9ef3-a5ce5535a525" />
</p>

---
## UI
<p>
<img width="1108" height="893" alt="Image" src="https://github.com/user-attachments/assets/caf2645e-535a-42ea-879c-367a2c45f6e9" />
</p>
<p>
<img width="1480" height="861" alt="Image" src="https://github.com/user-attachments/assets/9fade4fe-fba3-4a73-88b5-3e9771775a49" />
</p>
<p>
<img width="873" height="917" alt="Image" src="https://github.com/user-attachments/assets/87461a47-a4fa-49f2-8b59-6526b9b33234" />
</p>
<p>
<img width="855" height="906" alt="Image" src="https://github.com/user-attachments/assets/a29e713e-dd52-4762-a26d-0350b444a1ef" />
</p>

---
## 실행화면
<p>
<img width="2560" height="1600" alt="Image" src="https://github.com/user-attachments/assets/c2ae8d46-37fa-449d-a3f0-7a7df925affd" />
</p>
<p>
<img width="2235" height="997" alt="Image" src="https://github.com/user-attachments/assets/b907d5c9-cb94-4737-b794-c331ba3261ac" />
</p>
<p>
<img width="1582" height="1022" alt="Image" src="https://github.com/user-attachments/assets/49914c0b-cf3b-44ad-b7b6-3dd19cf252d3" />
</p>
<p>
<img width="1354" height="1005" alt="Image" src="https://github.com/user-attachments/assets/a0b6adf3-639f-4166-9a79-5cd281977b0f" />
</p>

# AIVLE9_PROJ5_20

> AIVLE 9기 5차 미니프로젝트 (20조) · Spring Boot 기반 백엔드
>
> React 프론트엔드와 연동되는 **도서 CRUD · 검색 · 카테고리 필터 · AI 표지 생성** 백엔드 서버입니다.

<br>

### 🔗 관련 주소
- **Frontend (React)** : https://github.com/lsh4323/AIVLE_Mini-Project_4
- **Backend (현재 저장소)** : https://github.com/night1007/AIVLE9_PROJ5_20

<br>

## 📑 목차
1. [프로젝트 개요](#1-프로젝트-개요)
2. [R&R (역할 분담)](#2-rr-역할-분담)
3. [기술 스택](#3-기술-스택)
4. [프로젝트 구조](#4-프로젝트-구조)
5. [실행 방법](#5-실행-방법)
6. [API 명세](#6-api-명세)
7. [개발 미션 (4일 과정)](#7-개발-미션-4일-과정)
8. [트러블슈팅](#8-트러블슈팅)

<br>

## 1. 프로젝트 개요

- **목표**: 기존 Frontend 미니프로젝트(`db.json` + `fetch`)를 실제 백엔드 서버로 대체하여 풀스택 도서 관리 서비스를 완성한다.
- **핵심 기능**
  - 도서 등록 / 조회 / 수정 / 삭제 (CRUD)
  - 제목·저자 기반 검색 (완전 일치 / 키워드 / 복합 검색)
  - 대분류·소분류(장르/태그) 기반 카테고리 필터링
  - 페이지네이션 조회
  - **AI 표지 이미지 URL 저장** (React → OpenAI → React → Backend 저장 흐름)
  - 전역 예외 처리 (404 / 400 / 500 응답 정제)
- **데이터 흐름**: `Controller → Service → Repository → Entity` → 응답 시 `BookDTO`로 변환

<br>

## 2. R&R (역할 분담)

| 이름 | 운영 | 기술 |
|------|------|------|
| **이영창** | 조장 | PM 및 백엔드 개발 · `controller/BookController` |
| **김나현** | 발표 | 통합 / 예외 처리 |
| **김민정** | 서기 | 백엔드 개발 · `service/BookService`, `service/GenreService` |
| **송지수** | 발표 자료 관리 | AI / Frontend 연동 |
| **윤서영** | PPT 제작 | ERD 설계 및 DB 관리 |
| **이성호** | PPT 제작 | 백엔드 개발 · `domain/Book`, `repository/BookRepository` |
| **이수연** | 발표 자료 관리 | 백엔드 개발 · `domain/Genre`, `domain/BookTagMap`, `repository/GenreRepository` |

<br>

## 3. 기술 스택

| 구분 | 기술 |
|------|------|
| Language | Java 17 |
| Framework | Spring Boot 4.0.6 |
| 빌드 도구 | Gradle |
| 데이터 접근 | Spring Data JPA |
| Database | H2 (인메모리) |
| 검증 | Spring Boot Validation (Bean Validation) |
| 보일러플레이트 | Lombok |
| 개발 편의 | Spring Boot DevTools |
| 협업 | Git / GitHub |

<br>

## 4. 프로젝트 구조

### 시스템 구성도

<img width="1522" height="1511" alt="Image" src="https://github.com/user-attachments/assets/dd95b314-6b82-4de2-a3a6-9daded0f4da4" />

1. **CRUD · 검색**: 사용자 → React → Backend(`/books`) → JPA → H2, 응답은 `BookDTO`(JSON)
2. **AI 표지 생성**: React가 OpenAI를 직접 호출해 이미지 URL을 받은 뒤, `PATCH /books/{id}/cover`로 Backend에 저장

### 디렉토리 구조

```
bookapp
└── src/main/java/com/team20/bookapp
    ├── BookappApplication.java        # 애플리케이션 진입점
    ├── config
    │   └── WebConfig.java             # CORS 설정 (React :5173 허용)
    ├── controller
    │   └── BookController.java        # REST 엔드포인트 (/books)
    ├── service
    │   ├── BookService.java           # 도서 CRUD · 검색 비즈니스 로직
    │   └── GenreService.java          # 카테고리(장르/태그) 필터 로직
    ├── domain
    │   ├── Book.java                  # 도서 엔티티
    │   ├── Genre.java                 # 장르(대분류 + 소분류 리스트) 엔티티
    │   └── BookTagMap.java            # 도서-장르 매핑 엔티티 (소분류 보유)
    ├── dto
    │   └── BookDTO.java               # 요청·응답 DTO (+ GenreInfo 내부 클래스)
    ├── repository
    │   ├── BookRepository.java        # 도서 데이터 접근 (JPA)
    │   └── GenreRepository.java       # 장르·필터 데이터 접근 (JPA)
    └── exception
        ├── BookNotFoundException.java # 도서 미존재 사용자 정의 예외
        └── GlobalExceptionHandler.java# 전역 예외 처리 (@RestControllerAdvice)
```

### ERD 설계 문서

<img width="1358" height="712" alt="Image" src="https://github.com/user-attachments/assets/f27049ea-8fb6-45fd-8963-0ae2a140758a" />

- **Book** : 도서 메타데이터 테이블
  - 도서의 핵심 메타데이터와 OpenAI API 결과물(표지 URL)을 관리한다.
- **Genre** : 장르 테이블
  - 11개 대분류와 49개 세부 소분류 체계를 정제·보관한다.
- **BOOK_TAG_MAP** : 도서-태그 교차 엔티티 테이블
  - 한 권의 책이 다수의 장르 태그(대분류 1, 소분류 2)를 갖고, 하나의 장르 태그가 다수의 책에 붙는 **N:M 규칙을 정규화**하여 무결성을 유지한다.
- **Genre_Sub_Tag** : 소분류 테이블 / Genre 테이블의 자식 테이블
  - 어떤 책이 어떤 소분류 장르를 가졌는지 연결해 주는 매핑 행들을 보관한다.

> 그 외 제약조건은 별도 표기.

<br>

## 5. 실행 방법

### 사전 요구 사항
- JDK 17
- (선택) Frontend React 앱 — `http://localhost:5173`

### 1) 저장소 클론
```bash
git clone https://github.com/night1007/AIVLE9_PROJ5_20.git
cd AIVLE9_PROJ5_20/bookapp
```

### 2) 데이터베이스 설정
`src/main/resources/application-secret.yaml` 에 H2 접속 정보를 작성한다. (예시)
```yaml
spring:
  datasource:
    driver-class-name: org.h2.Driver
    url: jdbc:h2:mem:bookapp_db
    username: <your-username>
    password: <your-password>
```

### 3) 실행
```bash
# Windows
./gradlew.bat bootRun

# macOS / Linux
./gradlew bootRun
```

### 4) 접속 정보
| 항목 | 주소 |
|------|------|
| API 서버 | `http://localhost:8080` |
| H2 콘솔 | `http://localhost:8080/h2-console` |

> ⚠️ H2 인메모리 + `ddl-auto: create` 설정이므로 **서버 재시작 시 데이터가 초기화**됩니다.

<br>

## 6. API 명세

Base URL: `http://localhost:8080`

### 📖 도서 CRUD

| 기능 | Method | Endpoint |
|------|--------|----------|
| 전체 도서 조회 | `GET` | `/books` |
| 단일 도서 조회 | `GET` | `/books/{id}` |
| 도서 등록 | `POST` | `/books` |
| 도서 부분 수정 | `PATCH` | `/books/{id}` |
| 표지 URL 수정 | `PATCH` | `/books/{id}/cover` |
| 도서 삭제 | `DELETE` | `/books/{id}` |

### 🔍 검색

| 기능 | Method | Endpoint |
|------|--------|----------|
| 제목 완전 일치 | `GET` | `/books/search/title?title=` |
| 저자 완전 일치 | `GET` | `/books/search/author?author=` |
| 제목 키워드 포함 | `GET` | `/books/search/title-keyword?keyword=` |
| 저자 키워드 포함 | `GET` | `/books/search/author-keyword?keyword=` |
| 제목 + 저자 복합 | `GET` | `/books/search/detail?title=&author=` |
| 카테고리 필터 | `GET` | `/books/search/category?mainTag=&subTag=` |
| 페이지네이션 | `GET` | `/books/page?page=0&size=10&sortBy=id` |

### 🧪 예외 처리 및 동작 확인

본 프로젝트에서는 `@RestControllerAdvice`를 활용한 전역 예외 처리를 통해 클라이언트의 잘못된 요청에 적절히 대응하고, 서버의 안정성을 확보하였습니다. 모든 응답은 `{ status, message, data }` 형태로 통일되며, Postman을 활용하여 각 상태 코드에 대한 동작을 검증하였습니다.

#### 1. 정상 동작 확인 (`200 OK`)
<img width="1407" height="831" alt="Image" src="https://github.com/user-attachments/assets/97cd7c48-dc2d-4ae2-ba7d-514bb2d8a543" />
조회 요청이 성공적으로 처리된 경우입니다.

* **설정**: `GET` | `http://localhost:8080/books`

#### 2. 단일 조회 (`200 OK`)
<img width="2472" height="982" alt="Image" src="https://github.com/user-attachments/assets/423881fd-0f47-4091-b4ce-c30bf155a62f" />
특정 ID의 도서 상세 정보를 조회한 경우입니다.

* **설정**: `GET` | `http://localhost:8080/books/3`
* **응답 메시지**:

```json
{
  "status": "success",
  "message": "도서 상세 조회 성공",
  "data": {
    "id": 3,
    "title": "작별인사",
    "author": "김영하",
    "content": "어느 날 갑자기 자신의 존재를 부정당한 소년 철이가 겪는 인간과 휴머노이드 사이의 이야기.",
    "coverImageUrl": "https://image.aladin.co.kr/product/29329/4/cover500/8932039304_1.jpg",
    "createdAt": "2026-06-12T14:09:51.191862",
    "updatedAt": "2026-06-12T14:09:51.191862",
    "genres": [
      { "mainTag": "소설", "subTag": "SF소설" }
    ]
  }
}
```

#### 3. 도서 등록 성공 (`201 Created`)
<img width="989" height="308" alt="Image" src="https://github.com/user-attachments/assets/da189824-8938-44a4-a4dd-e48fb5ffafb8" />

정상적인 데이터를 입력하여 서버에 도서 정보가 성공적으로 저장된 경우입니다.

* **설정**: `POST` | `http://localhost:8080/books`
* **Request Body**:

```json
{
  "title": "작별인사",
  "author": "김영하",
  "content": "어느 날 갑자기 자신의 존재를 부정당한 소년 철이가 겪는 인간과 휴머노이드 사이의 이야기.",
  "coverImageUrl": "https://image.aladin.co.kr/product/29329/4/cover500/8932039304_1.jpg",
  "genres": [
    {
      "mainTag": "소설",
      "subTag": "SF소설"
    }
  ]
}
```

#### 4. 도서 수정 (`200 OK`)
<img width="2451" height="971" alt="Image" src="https://github.com/user-attachments/assets/6b79ea65-fa90-4be2-ab46-85137f1953db" />
기존 도서의 일부 필드(내용·표지 등)만 부분 수정한 경우입니다.

* **설정**: `PATCH` | `http://localhost:8080/books/2`
* **Request Body**:

```json
{
  "content": "수정된 내용입니다. 철이와 휴머노이드의 우정을 더 깊게 다루었습니다.",
  "coverImageUrl": "http://new-image-url.com/modified.jpg"
}
```

* **응답 메시지**:

```json
{
  "status": "success",
  "message": "도서 수정 성공",
  "data": {
    "id": 2,
    "title": "작별인사",
    "author": "김영하",
    "content": "수정된 내용입니다. 철이와 휴머노이드의 우정을 더 깊게 다루었습니다.",
    "coverImageUrl": "http://new-image-url.com/modified.jpg",
    "createdAt": "2026-06-12T14:08:49.754167",
    "updatedAt": "2026-06-12T14:42:29.314305",
    "genres": [
      { "mainTag": "소설", "subTag": "SF소설" }
    ]
  }
}
```

#### 5. 도서 삭제 (`200 OK`)
<img width="2467" height="982" alt="Image" src="https://github.com/user-attachments/assets/d0a38236-d2e6-4576-839b-a3fd890ac97d" />
특정 ID의 도서를 삭제한 경우입니다.

* **설정**: `DELETE` | `http://localhost:8080/books/2`
* **응답 메시지**:

```json
{
  "status": "success",
  "message": "도서 삭제 성공"
}
```

#### 6. 잘못된 요청 (`400 Bad Request`)
<img width="2462" height="980" alt="Image" src="https://github.com/user-attachments/assets/af3fc569-8307-453a-8b4f-440253e92163" />
유효성 검증(`@Valid`) 규칙을 위반하여 필수 입력값이 누락된 경우입니다.

* **설정**: `POST` | `http://localhost:8080/books`
* **Request Body**:

```json
{
  "title": "",
  "author": ""
}
```

* **응답 메시지**: `{"status": "fail", "message": "잘못된 요청입니다: 입력값을 확인해주세요."}`

#### 7. 데이터 조회 실패 (`404 Not Found`)
<img width="1002" height="288" alt="Image" src="https://github.com/user-attachments/assets/844d0eb2-2cf8-4f21-8864-29d4b0580851" />
존재하지 않는 도서 ID로 조회를 시도했을 경우 발생하는 예외입니다.

* **설정**: `GET` | `http://localhost:8080/books/9999`
* **응답 메시지**: `{"status": "fail", "message": "해당 도서를 찾을 수 없습니다. id=9999"}`

#### 8. 서버 내부 오류 (`500 Internal Server Error`)
<img width="1412" height="842" alt="Image" src="https://github.com/user-attachments/assets/bd80417d-8a34-4ea3-88bf-e5a17c09aa87" />
서버 로직 처리 중 예상치 못한 타입 오류 등으로 인해 예외가 발생한 경우입니다.

* **설정**: `POST` | `http://localhost:8080/books`
* **Request Body**:

```json
{
  "title": 12345,
  "author": 12345,
  "content": "서버 예외 테스트"
}
```

* **응답 메시지**: `{"status": "error", "message": "서버 오류가 발생했습니다."}`

> 제목·저자·내용은 `@NotBlank` 필수값입니다.

#### 9. 검색 결과 없음 (200 OK - Empty State)
<img width="2312" height="980" alt="Image" src="https://github.com/user-attachments/assets/c1f88502-283e-4201-b81b-a2326aabacd1" />
검색 조건에 맞는 도서가 DB에 존재하지 않을 때의 처리입니다. 서버 오류(500)나 조회 실패(404)가 아닌, 정상적인 빈 리스트를 반환하여 프론트엔드에서 '검색 결과 없음' UI를 띄울 수 있도록 설계했습니다.

* **설정**: `GET` | `http://localhost:8080/books/search/detail?title=월드컵&author=월드컵`
* **특징**: 
    - 상태 코드 **200 OK** 반환 (요청 자체는 성공)
    - 응답 데이터의 `data` 필드에 빈 배열(`[]`) 전달
* **응답 메시지**:
```json
{
  "status": "success",
  "message": "도서 상세 검색 완료",
  "data": []
}
```

<br>

## 7. 개발 미션 (4일 과정)

> 진행한 미션을 중심으로 정리하였습니다.

### 미션 1 · 기획/설계
- 기존 Frontend 미니프로젝트(`db.json` + `fetch`) 분석 → 호출 패턴에 맞춰 API 정의서 작성
- ERD 설계 (Book / Genre / BOOK_TAG_MAP / Genre_Sub_Tag) 및 팀 R&R 분담 확정

### 미션 2 · 환경설정 + 전 계층 골격
- Spring Initializr로 `com.team20.bookapp` 생성, `Book` 엔티티 정의
- `BookRepository` / `BookService` / `BookController` 계층 골격 작성
- `WebConfig`(CORS, React `:5173` 허용) + `application.yaml` 설정으로 연동 대비
- Git 저장소 생성 및 초기 커밋 (전 계층 컴파일 통과 확인)

### 미션 3 · 조회(GET 2종)
- `BookRepository`(JpaRepository 상속)에 `@EntityGraph` 적용 → 도서 조회 시 장르를 한 번에 로딩(N+1 방지)
- `BookService.findAll()` / `findById()` 구현 — `BookDTO.from()` 변환, `@Transactional(readOnly = true)`
- `BookController` `GET /books`, `GET /books/{id}` 완성 (`200 OK`)
- Postman 테스트 후 Frontend `fetch` URL을 8080으로 변경해 1차 연동

### 미션 4 · 등록/수정/삭제 + 검증
- `BookDTO`에 `@NotBlank`(제목·저자·내용) 적용 → 검증 실패 시 `400`
- `BookService.create()` / `update()`(null 아닌 필드만 반영) / `deleteBook()` 구현
- `BookController` POST(`201`) · PATCH(`200`) · DELETE(`204`) 완성
- Postman + React 화면 양쪽에서 풀스택 CRUD 동작 확인

### 미션 5 · 사용자 정의 예외 + @Transactional
- `exception` 패키지에 `BookNotFoundException` 생성, 상세 조회 시 미존재 도서에 대해 예외 발생
- 조회 메서드에 `@Transactional(readOnly = true)`, CUD 메서드에 `@Transactional` 적용

### 미션 6 · 전역 예외 처리(@RestControllerAdvice)
- `GlobalExceptionHandler`로 모든 Controller 예외를 일관 처리
- 도서 없음 → `404`, 입력 검증 실패 → `400`, 그 외 → `500`으로 응답 정제
- Postman + React 화면에서 예외 시나리오 전체 검증

### 미션 7 · AI 표지 생성 흐름
- 표지 URL 저장 전용 엔드포인트 `PATCH /books/{id}/cover` 추가
- `BookService`에 표지 URL 업데이트 메서드 연결 (부분 수정 로직 재사용)
- Frontend에서 OpenAI 직접 호출 → `React → OpenAI → React → Backend 저장` 흐름 검증

<br>
<details>
<summary>📋 미션</summary>

| 미션 | 과제 | 주요 내용 |
|------|------|-----------|
| 미션 1 | 기획/설계 | • 기존 Frontend 미니프로젝트 분석 (`db.json` + `fetch` 호출 패턴)<br>• ERD 작성 (Book Entity 필드 도출)<br>• API 정의서 작성 (Frontend 호출 패턴에 맞춤)<br>• 팀 R&R 분담 확정 |
| 미션 2 | 환경설정 + 모든 계층 골격 작성 | • [Domain] Spring Initializr → `com.team20.bookapp` + Book Entity<br>• [Repository] `BookRepository` 생성<br>• [Service] `BookService` 골격<br>• [Controller] `BookController` 골격<br>• [통합] `WebConfig`(CORS) + `application.yaml` — 연동 대비<br>• Git 저장소 생성 및 초기 커밋 (모든 계층 컴파일 통과 확인) |
| 미션 3 | Repository + Service + GET 2종 | • [Repository] 기본 CRUD 메서드 동작 검증 + H2 콘솔로 데이터 확인<br>• [Service] 목록 조회·상세 조회 메서드 구현 (생성자 주입 적용)<br>• [Controller] `GET /books`, `GET /books/{id}` 완성<br>• [통합] Postman 테스트 → Frontend 1차 연동 (`fetch` URL만 8080으로 변경) |
| 미션 4 | POST/PATCH/DELETE + 검증 | • [Domain] Book Entity에 입력 검증 어노테이션 추가<br>• [Service] 등록 / 부분 수정 / 삭제 메서드 구현<br>• [Controller] POST + 검증 / PATCH(부분 수정) / DELETE<br>• [통합] 풀스택 CRUD 동작 확인 (Postman + React 화면 양쪽) |
| 미션 5 | 사용자 정의 예외 + @Transactional | • exception 패키지에 `BookNotFoundException` 생성<br>• `BookService` 상세 조회 메서드에 예외 발생 로직 추가<br>• CUD 메서드에 `@Transactional` 적용<br>• 조회 메서드에 `@Transactional(readOnly = true)` 적용 |
| 미션 6 | 전역 예외 처리 (@RestControllerAdvice) | • [통합] 전역 예외 처리 클래스 작성 (모든 Controller 예외 일관 처리)<br>• 도서 없음 → `404` 응답으로 정제<br>• 검증 실패 → `400` 응답으로 정제<br>• Postman + React 화면에서 예외 시나리오 전체 확인 |
| 미션 7 | AI 표지 생성 흐름 구현 | • [Backend] 표지 URL 저장용 엔드포인트 추가 (`PATCH /books/{id}/cover`)<br>• [Backend] `BookService`에 표지 URL 업데이트 메서드 추가<br>• [Frontend] OpenAI 직접 호출 (Frontend 미니프로젝트 학습 코드 활용)<br>• React → OpenAI → React → Backend 저장 흐름 검증 |

</details>

<br>

## 8. 트러블슈팅

### 1) 에러 코드 충돌 이슈
- **상황**: 새 책을 등록하거나 장르가 없는 책을 조회할 때 서버가 `500 Internal Server Error` 를 반환.
- **원인**: 404 에러를 `BookService.java` 에서 처리하도록 되어 있는데, DTO 엔티티에서 위반 사항이 먼저 걸려 우선적으로 500 에러를 내는 것을 확인.
- **해결안**: DTO에 필수값 검증을 추가하여 의도한 404(검증 실패 시 400) 에러가 정상적으로 핸들링되도록 정제.

```java
@NotBlank(message = "제목은 필수입니다.") // 필수값 검증 추가
private String title;

@NotBlank(message = "저자는 필수입니다.") // 필수값 검증 추가
private String author;

@NotBlank(message = "내용은 필수입니다.") // 필수값 검증 추가
private String content;
```

### 2) 동일 장르 연속 요청 시 데이터 자가 복제 증식 이슈
- **상황**: 첫 번째 책 등록 후, 곧바로 연달아 같은 대분류를 갖는 두 번째 책을 등록하면 `genres` 배열 내부에 이전 책의 장르와 새 장르가 붙어 증식.
- **원인**:
  1. JPA 영속성 컨텍스트의 잔상이 메모리에 남아있는 상태에서 양방향 연관관계 가방(컬렉션)을 비워주지 않고 계속 `.add()` 를 누적함.
  2. `BookService.create()` 내부에서 대분류를 검사하던 조건문 오타(`.contains(genreInfo.getMainTag())`)로 인해 중복 검사가 무력화되어 소분류가 계속 누적됨.
- **해결안**: `Book` 엔티티 내부에 연관관계 편의 메서드(`clearBookTagMaps()`, `addBookTagMap()`)를 작성하여 진입 시 가방을 완전히 청소하고, 서비스 저장 로직 마지막에 `flush()` 를 강제하여 영속성 캐시 오염을 원천 차단. 조건문 오타도 소분류 검사로 정확히 교정.

### 3) 장르 전체 출력 이슈
- **상황**: 포스트맨으로 `소분류: SF` 하나만 담아서 책을 등록했는데, 응답 창에는 예전 테스트 때 저장되었던 `판타지` 까지 세트로 묶여서 튀어나옴. (지속적인 소분류 노출 현상)
- **원인**: 매핑 테이블인 `BookTagMap` 이 대분류 마스터 엔티티(`Genre`)만 참조하고 있었음. 이로 인해 DTO에서 `.flatMap(btm -> btm.getGenre().getSubTag().stream())` 을 호출하는 순간, 이 책 고유의 데이터가 아니라 '소설'이라는 대분류 내부의 모든 소분류를 조인해서 긁어오는 구조적 모순이 발생함.
- **최종 해결안**:
  - 테이블 간의 종속성이 깨지지 않도록 `Genre` 와 소분류 테이블의 관계는 그대로 유지.
  - 연결 테이블인 `BookTagMap` 에 `subTag (String)` 일반 컬럼을 하나 추가하여, 이번 요청에서 진짜로 찍은 소분류 글자를 매핑 테이블 자체가 스스로 기억하게 만듦.
  - DTO 변환부를 `.map(btm -> btm.getSubTag())` 구조로 전면 단순화하여, 보낸 소분류 딱 하나만 정확하게 사출되도록 아키텍처 완성.

<br>

---

<div align="center">

**AIVLE 9기 5차 미니프로젝트 · 20조**

</div>