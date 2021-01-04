--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.14
-- Dumped by pg_dump version 10.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: goadmin_menu_myid_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.goadmin_menu_myid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.goadmin_menu_myid_seq OWNER TO webadmin;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: goadmin_menu; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.goadmin_menu (
    id integer DEFAULT nextval('public.goadmin_menu_myid_seq'::regclass) NOT NULL,
    parent_id integer DEFAULT 0 NOT NULL,
    type integer DEFAULT 0,
    "order" integer DEFAULT 0 NOT NULL,
    title character varying(50) NOT NULL,
    header character varying(100),
    plugin_name character varying(100) NOT NULL,
    icon character varying(50) NOT NULL,
    uri character varying(3000) NOT NULL,
    uuid character varying(100),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.goadmin_menu OWNER TO webadmin;

--
-- Name: goadmin_operation_log_myid_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.goadmin_operation_log_myid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.goadmin_operation_log_myid_seq OWNER TO webadmin;

--
-- Name: goadmin_operation_log; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.goadmin_operation_log (
    id integer DEFAULT nextval('public.goadmin_operation_log_myid_seq'::regclass) NOT NULL,
    user_id integer NOT NULL,
    path character varying(255) NOT NULL,
    method character varying(10) NOT NULL,
    ip character varying(15) NOT NULL,
    input text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.goadmin_operation_log OWNER TO webadmin;

--
-- Name: goadmin_site_myid_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.goadmin_site_myid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.goadmin_site_myid_seq OWNER TO webadmin;

--
-- Name: goadmin_site; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.goadmin_site (
    id integer DEFAULT nextval('public.goadmin_site_myid_seq'::regclass) NOT NULL,
    key character varying(100) NOT NULL,
    value text NOT NULL,
    type integer DEFAULT 0,
    description character varying(3000),
    state integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.goadmin_site OWNER TO webadmin;

--
-- Name: goadmin_permissions_myid_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.goadmin_permissions_myid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.goadmin_permissions_myid_seq OWNER TO webadmin;

--
-- Name: goadmin_permissions; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.goadmin_permissions (
    id integer DEFAULT nextval('public.goadmin_permissions_myid_seq'::regclass) NOT NULL,
    name character varying(50) NOT NULL,
    slug character varying(50) NOT NULL,
    http_method character varying(255),
    http_path text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.goadmin_permissions OWNER TO webadmin;

--
-- Name: goadmin_role_menu; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.goadmin_role_menu (
    role_id integer NOT NULL,
    menu_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.goadmin_role_menu OWNER TO webadmin;

--
-- Name: goadmin_role_permissions; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.goadmin_role_permissions (
    role_id integer NOT NULL,
    permission_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.goadmin_role_permissions OWNER TO webadmin;

--
-- Name: goadmin_role_users; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.goadmin_role_users (
    role_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.goadmin_role_users OWNER TO webadmin;

--
-- Name: goadmin_roles_myid_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.goadmin_roles_myid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.goadmin_roles_myid_seq OWNER TO webadmin;

--
-- Name: goadmin_roles; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.goadmin_roles (
    id integer DEFAULT nextval('public.goadmin_roles_myid_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    slug character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.goadmin_roles OWNER TO webadmin;

--
-- Name: goadmin_session_myid_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.goadmin_session_myid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.goadmin_session_myid_seq OWNER TO webadmin;

--
-- Name: goadmin_session; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.goadmin_session (
    id integer DEFAULT nextval('public.goadmin_session_myid_seq'::regclass) NOT NULL,
    sid character varying(50) NOT NULL,
    "values" character varying(3000) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.goadmin_session OWNER TO webadmin;

--
-- Name: goadmin_user_permissions; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.goadmin_user_permissions (
    user_id integer NOT NULL,
    permission_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.goadmin_user_permissions OWNER TO webadmin;

--
-- Name: goadmin_users_myid_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

CREATE SEQUENCE public.goadmin_users_myid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.goadmin_users_myid_seq OWNER TO webadmin;

--
-- Name: goadmin_users; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public.goadmin_users (
    id integer DEFAULT nextval('public.goadmin_users_myid_seq'::regclass) NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    name character varying(100) NOT NULL,
    avatar character varying(255),
    remember_token character varying(100),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.goadmin_users OWNER TO webadmin;

--
-- Data for Name: goadmin_menu; Type: TABLE DATA; Schema: public; Owner: webadmin
--
COPY public.goadmin_menu (id, parent_id, type, "order", title, header, plugin_name, icon, uri, uuid, created_at, updated_at) FROM stdin;
41	39	0	25	Логи событий	Логи событий		fa-align-justify	/info/events_log	\N	2021-01-04 14:55:54.286002	2021-01-04 14:55:54.286002
7	0	1	1	Dashboard	\N		fa-bar-chart	/	\N	2019-09-10 00:00:00	2019-09-10 00:00:00
8	0	0	2	Данные	Данные		fa-table		\N	2021-01-04 10:55:33.316841	2021-01-04 10:55:33.316841
30	8	0	2	Новости	Новости		fa-newspaper-o		\N	2021-01-04 14:49:45.744916	2021-01-04 14:49:45.744916
31	30	0	2	Посты	Посты		fa-newspaper-o	/info/posts	\N	2021-01-04 14:50:17.776971	2021-01-04 14:50:17.776971
32	30	0	3	Очереди	Очереди		fa-list	/info/queue	\N	2021-01-04 14:51:46.557838	2021-01-04 14:51:46.557838
33	30	0	4	Версии	Версии		fa-bars	/info/versions	\N	2021-01-04 14:52:03.020758	2021-01-04 14:52:03.020758
34	8	0	5	Голосования	Голосования		fa-bar-chart		\N	2021-01-04 14:52:42.587399	2021-01-04 14:52:42.587399
36	34	0	5	Люди	Люди		fa-user	/info/votePersons	\N	2021-01-04 14:53:38.38935	2021-01-04 14:53:38.38935
35	34	0	6	Ответы	Ответы		fa-bars	/info/voteAnswers	\N	2021-01-04 14:53:09.462238	2021-01-04 14:53:09.462238
37	34	0	7	Вопросы	Вопросы		fa-question	/info/voteQuestions	\N	2021-01-04 14:54:04.049221	2021-01-04 14:54:04.049221
38	34	0	8	Голосования	Голосования		fa-bar-chart	/info/votes	\N	2021-01-04 14:54:29.827888	2021-01-04 14:54:29.827888
22	8	0	9	Документы	Документы		fa-briefcase		\N	2021-01-04 14:43:35.99944	2021-01-04 14:43:35.99944
23	22	0	9	Документы	Документы		fa-briefcase	/info/documents	\N	2021-01-04 14:44:09.676818	2021-01-04 14:44:09.676818
24	22	0	10	Инструкции	Инструкции		fa-file-text-o	/info/instructions	\N	2021-01-04 14:45:04.001777	2021-01-04 14:45:04.001777
15	8	0	11	Пользователи	Пользователи		fa-user-secret		\N	2021-01-04 14:31:07.212635	2021-01-04 14:31:07.212635
16	15	0	11	Роли	Роли		fa-user-md	/info/roles	\N	2021-01-04 14:33:21.375902	2021-01-04 14:33:21.375902
20	15	0	12	Приглашения	Приглашения		fa-mail-reply-all	/info/invites	\N	2021-01-04 14:40:06.616329	2021-01-04 14:40:06.616329
21	15	0	13	Токены уведомлений	Токены уведомлений		fa-rss	/info/notificationTokens	\N	2021-01-04 14:42:04.500275	2021-01-04 14:42:04.500275
14	15	0	14	Пользователи	Пользователи		fa-user	/info/users	\N	2021-01-04 11:30:17.712523	2021-01-04 17:31:21
17	15	0	15	Сессии			fa-user-secret	/info/sessions	\N	2021-01-04 14:35:19.970272	2021-01-04 14:35:19.970272
13	8	0	16	Квартиры	Квартиры		fa-home		\N	2021-01-04 11:29:00.794326	2021-01-04 17:36:22
18	13	0	16	Квартиры	Квартиры		fa-home	/info/flats	\N	2021-01-04 14:37:19.641134	2021-01-04 14:37:19.641134
19	13	0	17	Резиденты	Резиденты		fa-certificate	/info/residents	\N	2021-01-04 14:39:12.412026	2021-01-04 14:39:12.412026
9	13	0	18	Жители	Жители		fa-user	/info/persons	\N	2021-01-04 10:56:16.086768	2021-01-04 17:36:36
11	8	0	19	FAQ	FAQ		fa-question		\N	2021-01-04 11:26:50.387854	2021-01-04 11:26:50.387854
12	11	0	19	FAQ	FAQ		fa-question-circle	/info/faq	\N	2021-01-04 11:27:27.999724	2021-01-04 11:27:27.999724
10	11	0	20	FAQ Категории	FAQ Категории		fa-question-circle	/info/faqCategories	\N	2021-01-04 10:58:12.881378	2021-01-04 18:23:27
25	8	0	21	Чат	Чат		fa-comment		\N	2021-01-04 14:46:48.799547	2021-01-04 14:46:48.799547
26	25	0	21	Пользователи канала	Пользователи канала		fa-comment	/info/imChannelPersons	\N	2021-01-04 14:47:39.818382	2021-01-04 14:47:39.818382
27	25	0	22	Каналы	Каналы		fa-commenting	/info/imChannels	\N	2021-01-04 14:48:16.549745	2021-01-04 14:48:16.549745
28	25	0	23	Сообщения	Сообщения		fa-comments-o	/info/imMessages	\N	2021-01-04 14:48:50.609297	2021-01-04 14:48:50.609297
29	25	0	24	Сообщения показанные	Сообщения показанные		fa-bars	/info/imMessageShowPersons	\N	2021-01-04 14:49:26.741552	2021-01-04 14:49:26.741552
39	8	0	25	События	События		fa-edge		\N	2021-01-04 14:54:51.048729	2021-01-04 14:54:51.048729
40	39	0	26	События	События		fa-edge	/info/events	\N	2021-01-04 14:55:17.72522	2021-01-04 14:55:17.72522
1	0	1	27	Admin	\N		fa-tasks		\N	2019-09-10 00:00:00	2019-09-10 00:00:00
2	1	1	27	Users	\N		fa-users	/info/manager	\N	2019-09-10 00:00:00	2019-09-10 00:00:00
3	1	1	28	Roles	\N		fa-user	/info/roles	\N	2019-09-10 00:00:00	2019-09-10 00:00:00
4	1	1	29	Permission	\N		fa-ban	/info/permission	\N	2019-09-10 00:00:00	2019-09-10 00:00:00
5	1	1	30	Menu	\N		fa-bars	/menu	\N	2019-09-10 00:00:00	2019-09-10 00:00:00
6	1	1	31	Operation log	\N		fa-history	/info/op	\N	2019-09-10 00:00:00	2019-09-10 00:00:00
\.

--
-- Data for Name: goadmin_operation_log; Type: TABLE DATA; Schema: public; Owner: webadmin
--

COPY public.goadmin_operation_log (id, user_id, path, method, ip, input, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: goadmin_site; Type: TABLE DATA; Schema: public; Owner: webadmin
--

COPY public.goadmin_site (id, key, value, description, state, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: goadmin_permissions; Type: TABLE DATA; Schema: public; Owner: webadmin
--

COPY public.goadmin_permissions (id, name, slug, http_method, http_path, created_at, updated_at) FROM stdin;
1	All permission	*		*	2019-09-10 00:00:00	2019-09-10 00:00:00
2	Dashboard	dashboard	GET,PUT,POST,DELETE	/	2019-09-10 00:00:00	2019-09-10 00:00:00
\.


--
-- Data for Name: goadmin_role_menu; Type: TABLE DATA; Schema: public; Owner: webadmin
--
insert into public.goadmin_role_menu (role_id, menu_id, created_at, updated_at)
values  (1, 1, '2019-09-10 00:00:00.000000', '2019-09-10 00:00:00.000000'),
        (1, 7, '2019-09-10 00:00:00.000000', '2019-09-10 00:00:00.000000'),
        (2, 7, '2019-09-10 00:00:00.000000', '2019-09-10 00:00:00.000000'),
        (1, 8, '2021-01-04 10:55:33.326807', '2021-01-04 10:55:33.326807'),
        (1, 11, '2021-01-04 11:26:50.398376', '2021-01-04 11:26:50.398376'),
        (1, 12, '2021-01-04 11:27:28.011533', '2021-01-04 11:27:28.011533'),
        (1, 10, '2021-01-04 11:28:05.218758', '2021-01-04 11:28:05.218758'),
        (1, 14, '2021-01-04 14:31:21.213711', '2021-01-04 14:31:21.213711'),
        (1, 16, '2021-01-04 14:33:21.386220', '2021-01-04 14:33:21.386220'),
        (1, 17, '2021-01-04 14:35:19.979609', '2021-01-04 14:35:19.979609'),
        (1, 9, '2021-01-04 14:36:36.712336', '2021-01-04 14:36:36.712336'),
        (1, 18, '2021-01-04 14:37:19.652374', '2021-01-04 14:37:19.652374'),
        (1, 19, '2021-01-04 14:39:12.424037', '2021-01-04 14:39:12.424037'),
        (1, 20, '2021-01-04 14:40:06.626746', '2021-01-04 14:40:06.626746'),
        (1, 21, '2021-01-04 14:42:04.511379', '2021-01-04 14:42:04.511379'),
        (1, 23, '2021-01-04 14:44:09.688474', '2021-01-04 14:44:09.688474'),
        (1, 24, '2021-01-04 14:45:04.013737', '2021-01-04 14:45:04.013737'),
        (1, 26, '2021-01-04 14:47:39.831379', '2021-01-04 14:47:39.831379'),
        (1, 27, '2021-01-04 14:48:16.560639', '2021-01-04 14:48:16.560639'),
        (1, 28, '2021-01-04 14:48:50.619477', '2021-01-04 14:48:50.619477'),
        (1, 29, '2021-01-04 14:49:26.753230', '2021-01-04 14:49:26.753230'),
        (1, 31, '2021-01-04 14:50:17.786122', '2021-01-04 14:50:17.786122'),
        (1, 32, '2021-01-04 14:51:46.569888', '2021-01-04 14:51:46.569888'),
        (1, 33, '2021-01-04 14:52:03.030249', '2021-01-04 14:52:03.030249'),
        (1, 35, '2021-01-04 14:53:09.470766', '2021-01-04 14:53:09.470766'),
        (1, 36, '2021-01-04 14:53:38.397884', '2021-01-04 14:53:38.397884'),
        (1, 37, '2021-01-04 14:54:04.060346', '2021-01-04 14:54:04.060346'),
        (1, 38, '2021-01-04 14:54:29.840082', '2021-01-04 14:54:29.840082'),
        (1, 40, '2021-01-04 14:55:17.734969', '2021-01-04 14:55:17.734969'),
        (1, 41, '2021-01-04 14:55:54.296020', '2021-01-04 14:55:54.296020');


--
-- Data for Name: goadmin_role_permissions; Type: TABLE DATA; Schema: public; Owner: webadmin
--

COPY public.goadmin_role_permissions (role_id, permission_id, created_at, updated_at) FROM stdin;
1	1	2019-09-10 00:00:00	2019-09-10 00:00:00
1	2	2019-09-10 00:00:00	2019-09-10 00:00:00
2	2	2019-09-10 00:00:00	2019-09-10 00:00:00
0	3	\N	\N
0	3	\N	\N
0	3	\N	\N
0	3	\N	\N
0	3	\N	\N
0	3	\N	\N
0	3	\N	\N
0	3	\N	\N
0	3	\N	\N
0	3	\N	\N
0	3	\N	\N
0	3	\N	\N
0	3	\N	\N
0	3	\N	\N
0	3	\N	\N
0	3	\N	\N
\.


--
-- Data for Name: goadmin_role_users; Type: TABLE DATA; Schema: public; Owner: webadmin
--

COPY public.goadmin_role_users (role_id, user_id, created_at, updated_at) FROM stdin;
1	1	2019-09-10 00:00:00	2019-09-10 00:00:00
2	2	2019-09-10 00:00:00	2019-09-10 00:00:00
\.


--
-- Data for Name: goadmin_roles; Type: TABLE DATA; Schema: public; Owner: webadmin
--

COPY public.goadmin_roles (id, name, slug, created_at, updated_at) FROM stdin;
1	Administrator	administrator	2019-09-10 00:00:00	2019-09-10 00:00:00
2	Operator	operator	2019-09-10 00:00:00	2019-09-10 00:00:00
\.


--
-- Data for Name: goadmin_session; Type: TABLE DATA; Schema: public; Owner: webadmin
--

COPY public.goadmin_session (id, sid, "values", created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: goadmin_user_permissions; Type: TABLE DATA; Schema: public; Owner: webadmin
--

COPY public.goadmin_user_permissions (user_id, permission_id, created_at, updated_at) FROM stdin;
1	1	2019-09-10 00:00:00	2019-09-10 00:00:00
2	2	2019-09-10 00:00:00	2019-09-10 00:00:00
0	1	\N	\N
0	1	\N	\N
0	1	\N	\N
0	1	\N	\N
0	1	\N	\N
0	1	\N	\N
0	1	\N	\N
0	1	\N	\N
0	1	\N	\N
0	1	\N	\N
0	1	\N	\N
0	1	\N	\N
0	1	\N	\N
0	1	\N	\N
0	1	\N	\N
0	1	\N	\N
\.


--
-- Data for Name: goadmin_users; Type: TABLE DATA; Schema: public; Owner: webadmin
--

COPY public.goadmin_users (id, username, password, name, avatar, remember_token, created_at, updated_at) FROM stdin;
1	admin	$2a$10$OxWYJJGTP2gi00l2x06QuOWqw5VR47MQCJ0vNKnbMYfrutij10Hwe	admin		tlNcBVK9AvfYH7WEnwB1RKvocJu8FfRy4um3DJtwdHuJy0dwFsLOgAc0xUfh	2019-09-10 00:00:00	2019-09-10 00:00:00
2	operator	$2a$10$rVqkOzHjN2MdlEprRflb1eGP0oZXuSrbJLOmJagFsCd81YZm0bsh.	Operator		\N	2019-09-10 00:00:00	2019-09-10 00:00:00
\.


--
-- Name: goadmin_menu_myid_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.goadmin_menu_myid_seq', 7, true);


--
-- Name: goadmin_operation_log_myid_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.goadmin_operation_log_myid_seq', 1, true);


--
-- Name: goadmin_permissions_myid_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.goadmin_permissions_myid_seq', 2, true);


--
-- Name: goadmin_roles_myid_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.goadmin_roles_myid_seq', 2, true);


--
-- Name: goadmin_site_myid_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.goadmin_site_myid_seq', 1, true);


--
-- Name: goadmin_session_myid_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.goadmin_session_myid_seq', 1, true);


--
-- Name: goadmin_users_myid_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public.goadmin_users_myid_seq', 2, true);


--
-- Name: goadmin_menu goadmin_menu_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.goadmin_menu
    ADD CONSTRAINT goadmin_menu_pkey PRIMARY KEY (id);


--
-- Name: goadmin_operation_log goadmin_operation_log_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.goadmin_operation_log
    ADD CONSTRAINT goadmin_operation_log_pkey PRIMARY KEY (id);


--
-- Name: goadmin_permissions goadmin_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.goadmin_permissions
    ADD CONSTRAINT goadmin_permissions_pkey PRIMARY KEY (id);


--
-- Name: goadmin_roles goadmin_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.goadmin_roles
    ADD CONSTRAINT goadmin_roles_pkey PRIMARY KEY (id);


--
-- Name: goadmin_site goadmin_site_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.goadmin_site
    ADD CONSTRAINT goadmin_site_pkey PRIMARY KEY (id);


--
-- Name: goadmin_session goadmin_session_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.goadmin_session
    ADD CONSTRAINT goadmin_session_pkey PRIMARY KEY (id);


--
-- Name: goadmin_users goadmin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public.goadmin_users
    ADD CONSTRAINT goadmin_users_pkey PRIMARY KEY (id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: webadmin
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM webadmin;
GRANT ALL ON SCHEMA public TO webadmin;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

