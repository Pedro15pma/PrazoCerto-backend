-- =============================
-- TABELA: usuarios
-- =============================

CREATE SEQUENCE seq_usuarios START 1;

CREATE TABLE usuarios (
    id_usuario INTEGER DEFAULT nextval('seq_usuarios') PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha_hash TEXT NOT NULL,
    tipo_usuario TEXT NOT NULL CHECK (tipo_usuario IN ('admin', 'consumidor', 'estabelecimento')),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================
-- TABELA: estabelecimentos
-- =============================

CREATE SEQUENCE seq_estabelecimentos START 1;

CREATE TABLE estabelecimentos (
    id_estabelecimento INTEGER DEFAULT nextval('seq_estabelecimentos') PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    endereco TEXT,
    telefone TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================
-- TABELA: produtos (com estoque)
-- =============================

CREATE SEQUENCE seq_produtos START 1;

CREATE TABLE produtos (
    id_produto INTEGER DEFAULT nextval('seq_produtos') PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco_original NUMERIC(10,2) NOT NULL,
    preco_desconto NUMERIC(10,2) NOT NULL,
    validade DATE NOT NULL,
    id_estabelecimento INTEGER, -- relação lógica
    quantidade_estoque INTEGER NOT NULL DEFAULT 0,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================
-- TABELA: reservas
-- =============================

CREATE SEQUENCE seq_reservas START 1;

CREATE TABLE reservas (
    id_reserva INTEGER DEFAULT nextval('seq_reservas') PRIMARY KEY,
    id_usuario INTEGER,
    id_produto INTEGER,
    data_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL CHECK (status IN ('reservado', 'cancelado', 'retirado'))
);

-- =============================
-- TABELA: carrinhos
-- =============================

CREATE SEQUENCE seq_carrinhos START 1;

CREATE TABLE carrinhos (
    id_carrinho INTEGER DEFAULT nextval('seq_carrinhos') PRIMARY KEY,
    id_usuario INTEGER,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL CHECK (status IN ('aberto','fechado','cancelado'))
);

-- =============================
-- TABELA: carrinhos_itens
-- =============================

CREATE SEQUENCE seq_carrinhos_itens START 1;

CREATE TABLE carrinhos_itens (
    id_carrinho_item INTEGER DEFAULT nextval('seq_carrinhos_itens') PRIMARY KEY,
    id_carrinho INTEGER,
    id_produto INTEGER,
    quantidade INTEGER NOT NULL DEFAULT 1,
    data_inclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================
-- TABELA: compras
-- =============================

CREATE SEQUENCE seq_compras START 1;

CREATE TABLE compras (
    id_compra INTEGER DEFAULT nextval('seq_compras') PRIMARY KEY,
    id_carrinho INTEGER,
    id_usuario INTEGER,
    valor_total NUMERIC(10,2) NOT NULL,
    data_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL CHECK (status IN ('realizada','cancelada'))
);
