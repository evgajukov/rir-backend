--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: dom24x7; Type: DATABASE; Schema: -; Owner: webadmin
--

-- CREATE DATABASE dom24x7 WITH TEMPLATE = template0 ENCODING = 'UTF8';


-- ALTER DATABASE dom24x7 OWNER TO webadmin;

\connect dom24x7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: documents; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.documents (
    id integer NOT NULL,
    title character varying(256) NOT NULL,
    annotation character varying(256),
    url character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.documents OWNER TO webadmin;

--
-- Name: TABLE documents; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public.documents IS 'Список документов';


--
-- Name: documents_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.documents_id_seq OWNER TO webadmin;

--
-- Name: documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public.documents_id_seq OWNED BY public.documents.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.events (
    id integer NOT NULL,
    "userId" integer,
    type character varying(255) NOT NULL,
    status character varying(255) NOT NULL,
    priority character varying(255) DEFAULT 'MEDIUM'::character varying NOT NULL,
    data text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.events OWNER TO webadmin;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_id_seq OWNER TO webadmin;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: events_log; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.events_log (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "eventId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.events_log OWNER TO webadmin;

--
-- Name: events_log_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.events_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_log_id_seq OWNER TO webadmin;

--
-- Name: events_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public.events_log_id_seq OWNED BY public.events_log.id;


--
-- Name: faq; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.faq (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "categoryId" integer,
    title character varying(256),
    body text
);


ALTER TABLE public.faq OWNER TO webadmin;

--
-- Name: TABLE faq; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public.faq IS 'Часто задаваемые вопросы';


--
-- Name: faqCategories; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."faqCategories" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    name character varying(256) NOT NULL,
    description character varying(256)
);


ALTER TABLE public."faqCategories" OWNER TO webadmin;

--
-- Name: TABLE "faqCategories"; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public."faqCategories" IS 'Категории вопросов для FAQ';


--
-- Name: faqCategories_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public."faqCategories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."faqCategories_id_seq" OWNER TO webadmin;

--
-- Name: faqCategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public."faqCategories_id_seq" OWNED BY public."faqCategories".id;


--
-- Name: faq_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.faq_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.faq_id_seq OWNER TO webadmin;

--
-- Name: faq_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public.faq_id_seq OWNED BY public.faq.id;


--
-- Name: flats; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.flats (
    id integer NOT NULL,
    number integer,
    section integer,
    floor integer,
    rooms integer,
    square double precision,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.flats OWNER TO webadmin;

--
-- Name: TABLE flats; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public.flats IS 'Список доступных в доме квартир';


--
-- Name: COLUMN flats.number; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON COLUMN public.flats.number IS 'Номер квартиры';


--
-- Name: COLUMN flats.section; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON COLUMN public.flats.section IS 'Секция / подъезд';


--
-- Name: COLUMN flats.floor; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON COLUMN public.flats.floor IS 'Этаж';


--
-- Name: COLUMN flats.rooms; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON COLUMN public.flats.rooms IS 'Количество комнат';


--
-- Name: COLUMN flats.square; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON COLUMN public.flats.square IS 'Площадь квартиры';


--
-- Name: flats_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.flats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.flats_id_seq OWNER TO webadmin;

--
-- Name: flats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public.flats_id_seq OWNED BY public.flats.id;


--
-- Name: imChannelPersons; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."imChannelPersons" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "channelId" integer,
    "personId" integer
);


ALTER TABLE public."imChannelPersons" OWNER TO webadmin;

--
-- Name: TABLE "imChannelPersons"; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public."imChannelPersons" IS 'Участники группового чата';


--
-- Name: imChannelPersons_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public."imChannelPersons_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."imChannelPersons_id_seq" OWNER TO webadmin;

--
-- Name: imChannelPersons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public."imChannelPersons_id_seq" OWNED BY public."imChannelPersons".id;


--
-- Name: imChannels; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."imChannels" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    title character varying(256),
    house boolean DEFAULT false,
    section integer,
    floor integer
);


ALTER TABLE public."imChannels" OWNER TO webadmin;

--
-- Name: TABLE "imChannels"; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public."imChannels" IS 'Группы и каналы в чатах';


--
-- Name: COLUMN "imChannels".house; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON COLUMN public."imChannels".house IS 'Признак, что канал для всего дома';


--
-- Name: COLUMN "imChannels".section; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON COLUMN public."imChannels".section IS 'Если указана секция, то канал на конкретную секция, либо этаж конкретной секции, если еще и этаж указан';


--
-- Name: COLUMN "imChannels".floor; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON COLUMN public."imChannels".floor IS 'Указывается совместно с параметром секции. Если указан, то канал по конкретному этажу в секции';


--
-- Name: imChannels_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public."imChannels_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."imChannels_id_seq" OWNER TO webadmin;

--
-- Name: imChannels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public."imChannels_id_seq" OWNED BY public."imChannels".id;


--
-- Name: imMessageShowPersons; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."imMessageShowPersons" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "personId" integer,
    "messageId" integer
);


ALTER TABLE public."imMessageShowPersons" OWNER TO webadmin;

--
-- Name: TABLE "imMessageShowPersons"; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public."imMessageShowPersons" IS 'Сообщения, которые пользователь просмотрел';


--
-- Name: imMessageShowPersons_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public."imMessageShowPersons_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."imMessageShowPersons_id_seq" OWNER TO webadmin;

--
-- Name: imMessageShowPersons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public."imMessageShowPersons_id_seq" OWNED BY public."imMessageShowPersons".id;


--
-- Name: imMessages; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."imMessages" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "personId" integer,
    "channelId" integer,
    body json,
    deleted boolean DEFAULT false
);


ALTER TABLE public."imMessages" OWNER TO webadmin;

--
-- Name: TABLE "imMessages"; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public."imMessages" IS 'Сообщения в чате';


--
-- Name: imMessages_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public."imMessages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."imMessages_id_seq" OWNER TO webadmin;

--
-- Name: imMessages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public."imMessages_id_seq" OWNED BY public."imMessages".id;


--
-- Name: instructions; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.instructions (
    id integer NOT NULL,
    title character varying(256) NOT NULL,
    subtitle character varying(256),
    body json,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.instructions OWNER TO webadmin;

--
-- Name: TABLE instructions; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public.instructions IS 'Список инструкций';


--
-- Name: COLUMN instructions.body; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON COLUMN public.instructions.body IS 'json со списком шагов';


--
-- Name: instructions_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.instructions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.instructions_id_seq OWNER TO webadmin;

--
-- Name: instructions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public.instructions_id_seq OWNED BY public.instructions.id;


--
-- Name: invites; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.invites (
    id integer NOT NULL,
    "userId" integer,
    code character varying(255),
    used boolean DEFAULT false,
    "newUserId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.invites OWNER TO webadmin;

--
-- Name: TABLE invites; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public.invites IS 'Список приглашений';


--
-- Name: invites_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.invites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.invites_id_seq OWNER TO webadmin;

--
-- Name: invites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public.invites_id_seq OWNED BY public.invites.id;


--
-- Name: notificationTokens; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."notificationTokens" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer,
    token character varying(256)
);


ALTER TABLE public."notificationTokens" OWNER TO webadmin;

--
-- Name: TABLE "notificationTokens"; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public."notificationTokens" IS 'Токены пользователей для отображения нотификаций';


--
-- Name: notificationTokens_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public."notificationTokens_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."notificationTokens_id_seq" OWNER TO webadmin;

--
-- Name: notificationTokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public."notificationTokens_id_seq" OWNED BY public."notificationTokens".id;


--
-- Name: persons; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.persons (
    id integer NOT NULL,
    "userId" integer,
    surname character varying(255),
    name character varying(255),
    midname character varying(255),
    birthday timestamp with time zone,
    sex character varying(255) DEFAULT 'U'::character varying,
    biography text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    telegram character varying(256),
    access json
);


ALTER TABLE public.persons OWNER TO webadmin;

--
-- Name: TABLE persons; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public.persons IS 'Профили пользователей';


--
-- Name: COLUMN persons.telegram; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON COLUMN public.persons.telegram IS 'Аккаунт в Телеграм';


--
-- Name: COLUMN persons.access; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON COLUMN public.persons.access IS 'json с настройками безопасности по отображению персональных данных';


--
-- Name: persons_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.persons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.persons_id_seq OWNER TO webadmin;

--
-- Name: persons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public.persons_id_seq OWNED BY public.persons.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    title character varying(255),
    body text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    type character varying(256),
    url character varying(256)
);


ALTER TABLE public.posts OWNER TO webadmin;

--
-- Name: TABLE posts; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public.posts IS 'Новости';


--
-- Name: COLUMN posts.type; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON COLUMN public.posts.type IS 'Тип новости';


--
-- Name: COLUMN posts.url; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON COLUMN public.posts.url IS 'Ссылка на объект, о которой новость';


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO webadmin;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: queue; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.queue (
    id integer NOT NULL,
    prefix character varying(255),
    name character varying(255),
    status character varying(255) DEFAULT 'NEW'::character varying,
    data text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.queue OWNER TO webadmin;

--
-- Name: TABLE queue; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public.queue IS 'Очередь сообщений';


--
-- Name: queue_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.queue_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.queue_id_seq OWNER TO webadmin;

--
-- Name: queue_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public.queue_id_seq OWNED BY public.queue.id;


--
-- Name: residents; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.residents (
    id integer NOT NULL,
    "personId" integer,
    "flatId" integer,
    "isOwner" boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.residents OWNER TO webadmin;

--
-- Name: TABLE residents; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public.residents IS 'Связка пользователей с квартирави, которые у них в собственности, либо они в них живут';


--
-- Name: residents_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.residents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.residents_id_seq OWNER TO webadmin;

--
-- Name: residents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public.residents_id_seq OWNED BY public.residents.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(255),
    code character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.roles OWNER TO webadmin;

--
-- Name: TABLE roles; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public.roles IS 'Справочник ролей пользователей';


--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO webadmin;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    uuid character varying(255) NOT NULL,
    "userId" integer NOT NULL,
    ip character varying(255) NOT NULL,
    "forwardedIp" character varying(255),
    login timestamp with time zone,
    logout timestamp with time zone,
    online boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO webadmin;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO webadmin;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    mobile character varying(255) NOT NULL,
    "smsCode" character varying(255),
    banned boolean DEFAULT false,
    "roleId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO webadmin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO webadmin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: versions; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.versions (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    number integer,
    build integer
);


ALTER TABLE public.versions OWNER TO webadmin;

--
-- Name: TABLE versions; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public.versions IS 'Актуальные версии приложения';


--
-- Name: versions_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.versions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.versions_id_seq OWNER TO webadmin;

--
-- Name: versions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public.versions_id_seq OWNED BY public.versions.id;


--
-- Name: voteAnswers; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."voteAnswers" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "voteId" integer,
    "questionId" integer,
    "personId" integer
);


ALTER TABLE public."voteAnswers" OWNER TO webadmin;

--
-- Name: TABLE "voteAnswers"; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public."voteAnswers" IS 'Список ответов по голосованию';


--
-- Name: voteAnswers_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public."voteAnswers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."voteAnswers_id_seq" OWNER TO webadmin;

--
-- Name: voteAnswers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public."voteAnswers_id_seq" OWNED BY public."voteAnswers".id;


--
-- Name: votePersons; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."votePersons" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "voteId" integer,
    "personId" integer
);


ALTER TABLE public."votePersons" OWNER TO webadmin;

--
-- Name: TABLE "votePersons"; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public."votePersons" IS 'Список пользователей, которые имеют доступ к голосованию';


--
-- Name: votePersons_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public."votePersons_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."votePersons_id_seq" OWNER TO webadmin;

--
-- Name: votePersons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public."votePersons_id_seq" OWNED BY public."votePersons".id;


--
-- Name: voteQuestions; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."voteQuestions" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "voteId" integer,
    body character varying(256)
);


ALTER TABLE public."voteQuestions" OWNER TO webadmin;

--
-- Name: TABLE "voteQuestions"; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public."voteQuestions" IS 'Список вопросов для голосования';


--
-- Name: voteQuestions_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public."voteQuestions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."voteQuestions_id_seq" OWNER TO webadmin;

--
-- Name: voteQuestions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public."voteQuestions_id_seq" OWNED BY public."voteQuestions".id;


--
-- Name: votes; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.votes (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    title character varying(256),
    multi boolean DEFAULT false,
    anonymous boolean DEFAULT false,
    closed boolean DEFAULT false,
    house boolean DEFAULT false,
    section integer,
    floor integer,
    "userId" integer
);


ALTER TABLE public.votes OWNER TO webadmin;

--
-- Name: TABLE votes; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON TABLE public.votes IS 'Список голосований';


--
-- Name: COLUMN votes.multi; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON COLUMN public.votes.multi IS 'Признак, что можно выбирать сразу несколько вариантов';


--
-- Name: COLUMN votes.anonymous; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON COLUMN public.votes.anonymous IS 'Признак, что голосование анонимное';


--
-- Name: COLUMN votes.closed; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON COLUMN public.votes.closed IS 'Признак, что голосование закрыто';


--
-- Name: COLUMN votes.house; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON COLUMN public.votes.house IS 'Признак, что голосование на весь дом';


--
-- Name: COLUMN votes.section; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON COLUMN public.votes.section IS 'Если указана секция, то голосование на конкретную секция, либо этаж конкретной секции, если еще и этаж указан';


--
-- Name: COLUMN votes.floor; Type: COMMENT; Schema: public; Owner: webadmin
--

COMMENT ON COLUMN public.votes.floor IS 'Указывается совместно с параметром секции. Если указан, то голосование по конкретному этажу в секции';


--
-- Name: votes_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.votes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.votes_id_seq OWNER TO webadmin;

--
-- Name: votes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: webadmin
--

ALTER SEQUENCE public.votes_id_seq OWNED BY public.votes.id;


--
-- Name: documents id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.documents ALTER COLUMN id SET DEFAULT nextval('public.documents_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: events_log id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.events_log ALTER COLUMN id SET DEFAULT nextval('public.events_log_id_seq'::regclass);


--
-- Name: faq id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.faq ALTER COLUMN id SET DEFAULT nextval('public.faq_id_seq'::regclass);


--
-- Name: faqCategories id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."faqCategories" ALTER COLUMN id SET DEFAULT nextval('public."faqCategories_id_seq"'::regclass);


--
-- Name: flats id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.flats ALTER COLUMN id SET DEFAULT nextval('public.flats_id_seq'::regclass);


--
-- Name: imChannelPersons id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."imChannelPersons" ALTER COLUMN id SET DEFAULT nextval('public."imChannelPersons_id_seq"'::regclass);


--
-- Name: imChannels id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."imChannels" ALTER COLUMN id SET DEFAULT nextval('public."imChannels_id_seq"'::regclass);


--
-- Name: imMessageShowPersons id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."imMessageShowPersons" ALTER COLUMN id SET DEFAULT nextval('public."imMessageShowPersons_id_seq"'::regclass);


--
-- Name: imMessages id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."imMessages" ALTER COLUMN id SET DEFAULT nextval('public."imMessages_id_seq"'::regclass);


--
-- Name: instructions id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.instructions ALTER COLUMN id SET DEFAULT nextval('public.instructions_id_seq'::regclass);


--
-- Name: invites id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.invites ALTER COLUMN id SET DEFAULT nextval('public.invites_id_seq'::regclass);


--
-- Name: notificationTokens id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."notificationTokens" ALTER COLUMN id SET DEFAULT nextval('public."notificationTokens_id_seq"'::regclass);


--
-- Name: persons id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.persons ALTER COLUMN id SET DEFAULT nextval('public.persons_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: queue id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.queue ALTER COLUMN id SET DEFAULT nextval('public.queue_id_seq'::regclass);


--
-- Name: residents id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.residents ALTER COLUMN id SET DEFAULT nextval('public.residents_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: versions id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.versions ALTER COLUMN id SET DEFAULT nextval('public.versions_id_seq'::regclass);


--
-- Name: voteAnswers id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."voteAnswers" ALTER COLUMN id SET DEFAULT nextval('public."voteAnswers_id_seq"'::regclass);


--
-- Name: votePersons id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."votePersons" ALTER COLUMN id SET DEFAULT nextval('public."votePersons_id_seq"'::regclass);


--
-- Name: voteQuestions id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."voteQuestions" ALTER COLUMN id SET DEFAULT nextval('public."voteQuestions_id_seq"'::regclass);


--
-- Name: votes id; Type: DEFAULT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.votes ALTER COLUMN id SET DEFAULT nextval('public.votes_id_seq'::regclass);

--
-- Name: documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.documents_id_seq', 9, true);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.events_id_seq', 1, false);


--
-- Name: events_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.events_log_id_seq', 1, false);


--
-- Name: faqCategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."faqCategories_id_seq"', 4, true);


--
-- Name: faq_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.faq_id_seq', 19, true);


--
-- Name: flats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.flats_id_seq', 1026, true);


--
-- Name: imChannelPersons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."imChannelPersons_id_seq"', 1788, true);


--
-- Name: imChannels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."imChannels_id_seq"', 179, true);


--
-- Name: imMessageShowPersons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."imMessageShowPersons_id_seq"', 1, false);


--
-- Name: imMessages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."imMessages_id_seq"', 1964, true);


--
-- Name: instructions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.instructions_id_seq', 3, true);


--
-- Name: invites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.invites_id_seq', 281, true);


--
-- Name: notificationTokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."notificationTokens_id_seq"', 36, true);


--
-- Name: persons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.persons_id_seq', 244, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.posts_id_seq', 262, true);


--
-- Name: queue_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.queue_id_seq', 1, false);


--
-- Name: residents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.residents_id_seq', 244, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.roles_id_seq', 2, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.sessions_id_seq', 11243, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.users_id_seq', 249, true);


--
-- Name: versions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.versions_id_seq', 4, true);


--
-- Name: voteAnswers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."voteAnswers_id_seq"', 75, true);


--
-- Name: votePersons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."votePersons_id_seq"', 504, true);


--
-- Name: voteQuestions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."voteQuestions_id_seq"', 21, true);


--
-- Name: votes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.votes_id_seq', 8, true);


--
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);


--
-- Name: events_log events_log_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.events_log
    ADD CONSTRAINT events_log_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: faqCategories faqCategories_name_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."faqCategories"
    ADD CONSTRAINT "faqCategories_name_key" UNIQUE (name);


--
-- Name: faqCategories faqCategories_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."faqCategories"
    ADD CONSTRAINT "faqCategories_pkey" PRIMARY KEY (id);


--
-- Name: faq faq_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.faq
    ADD CONSTRAINT faq_pkey PRIMARY KEY (id);


--
-- Name: flats flats_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.flats
    ADD CONSTRAINT flats_pkey PRIMARY KEY (id);


--
-- Name: imChannelPersons imChannelPersons_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."imChannelPersons"
    ADD CONSTRAINT "imChannelPersons_pkey" PRIMARY KEY (id);


--
-- Name: imChannels imChannels_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."imChannels"
    ADD CONSTRAINT "imChannels_pkey" PRIMARY KEY (id);


--
-- Name: imMessageShowPersons imMessageShowPersons_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."imMessageShowPersons"
    ADD CONSTRAINT "imMessageShowPersons_pkey" PRIMARY KEY (id);


--
-- Name: imMessages imMessages_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."imMessages"
    ADD CONSTRAINT "imMessages_pkey" PRIMARY KEY (id);


--
-- Name: instructions instructions_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.instructions
    ADD CONSTRAINT instructions_pkey PRIMARY KEY (id);


--
-- Name: invites invites_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.invites
    ADD CONSTRAINT invites_pkey PRIMARY KEY (id);


--
-- Name: notificationTokens notificationTokens_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."notificationTokens"
    ADD CONSTRAINT "notificationTokens_pkey" PRIMARY KEY (id);


--
-- Name: persons persons_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.persons
    ADD CONSTRAINT persons_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: queue queue_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.queue
    ADD CONSTRAINT queue_pkey PRIMARY KEY (id);


--
-- Name: residents residents_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.residents
    ADD CONSTRAINT residents_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_mobile_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_mobile_key UNIQUE (mobile);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: versions versions_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.versions
    ADD CONSTRAINT versions_pkey PRIMARY KEY (id);


--
-- Name: voteAnswers voteAnswers_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."voteAnswers"
    ADD CONSTRAINT "voteAnswers_pkey" PRIMARY KEY (id);


--
-- Name: votePersons votePersons_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."votePersons"
    ADD CONSTRAINT "votePersons_pkey" PRIMARY KEY (id);


--
-- Name: voteQuestions voteQuestions_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."voteQuestions"
    ADD CONSTRAINT "voteQuestions_pkey" PRIMARY KEY (id);


--
-- Name: votes votes_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY (id);


--
-- Name: events_log events_log_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.events_log
    ADD CONSTRAINT "events_log_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public.events(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: events events_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "events_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: faq faq_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.faq
    ADD CONSTRAINT "faq_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."faqCategories"(id);


--
-- Name: imChannelPersons imChannelPersons_channelId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."imChannelPersons"
    ADD CONSTRAINT "imChannelPersons_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES public."imChannels"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: imChannelPersons imChannelPersons_personId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."imChannelPersons"
    ADD CONSTRAINT "imChannelPersons_personId_fkey" FOREIGN KEY ("personId") REFERENCES public.persons(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: imMessageShowPersons imMessageShowPersons_messageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."imMessageShowPersons"
    ADD CONSTRAINT "imMessageShowPersons_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES public."imMessages"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: imMessageShowPersons imMessageShowPersons_personId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."imMessageShowPersons"
    ADD CONSTRAINT "imMessageShowPersons_personId_fkey" FOREIGN KEY ("personId") REFERENCES public.persons(id);


--
-- Name: imMessages imMessages_channelId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."imMessages"
    ADD CONSTRAINT "imMessages_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES public."imChannels"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: imMessages imMessages_personId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."imMessages"
    ADD CONSTRAINT "imMessages_personId_fkey" FOREIGN KEY ("personId") REFERENCES public.persons(id);


--
-- Name: invites invites_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.invites
    ADD CONSTRAINT "invites_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: notificationTokens notificationTokens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."notificationTokens"
    ADD CONSTRAINT "notificationTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: persons persons_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.persons
    ADD CONSTRAINT "persons_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: residents residents_flatId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.residents
    ADD CONSTRAINT "residents_flatId_fkey" FOREIGN KEY ("flatId") REFERENCES public.flats(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: residents residents_personId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.residents
    ADD CONSTRAINT "residents_personId_fkey" FOREIGN KEY ("personId") REFERENCES public.persons(id) ON UPDATE CASCADE;


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: users users_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: voteAnswers voteAnswers_personId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."voteAnswers"
    ADD CONSTRAINT "voteAnswers_personId_fkey" FOREIGN KEY ("personId") REFERENCES public.persons(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: voteAnswers voteAnswers_questionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."voteAnswers"
    ADD CONSTRAINT "voteAnswers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES public."voteQuestions"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: voteAnswers voteAnswers_voteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."voteAnswers"
    ADD CONSTRAINT "voteAnswers_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES public.votes(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: votePersons votePersons_personId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."votePersons"
    ADD CONSTRAINT "votePersons_personId_fkey" FOREIGN KEY ("personId") REFERENCES public.persons(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: votePersons votePersons_voteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."votePersons"
    ADD CONSTRAINT "votePersons_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES public.votes(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: voteQuestions voteQuestions_voteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."voteQuestions"
    ADD CONSTRAINT "voteQuestions_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES public.votes(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: votes votes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT "votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

