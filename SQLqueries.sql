CREATE TABLE Users (
    id INT AUTO_INCREMENT,
    email VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(id, email)
);

CREATE TABLE Templates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    newhire_id INTEGER,
    FOREIGN KEY (newhire_id) REFERENCES Users(id)
);

CREATE TABLE Tech_Stack_Options (
    platform_name VARCHAR(255) NOT NULL,
    platform_link VARCHAR(255) NOT NULL,
    platform_instruction VARCHAR(255),
    hyper_text VARCHAR(255),
    customization BOOLEAN,
    PRIMARY KEY (platform_name, platform_link)
);

CREATE TABLE TemplateOwners (
    template_id INTEGER,
    owner_id INTEGER,
    PRIMARY KEY (template_id, owner_id),
    FOREIGN KEY (template_id) REFERENCES Templates(id),
    FOREIGN KEY (owner_id) REFERENCES Users(id)
);

CREATE TABLE Template_Tech_Stack (
    template_id INTEGER,
    platform_name VARCHAR(255),
    PRIMARY KEY (template_id, platform_name),
    FOREIGN KEY (template_id) REFERENCES Templates(id),
    FOREIGN KEY (platform_name) REFERENCES Tech_Stack_Options(platform_name)
);

CREATE TABLE NewHire_Changes (
    id INT AUTO_INCREMENT,
    template_id INTEGER,
    changed_platform VARCHAR(255),
    changed_link VARCHAR(255),
    changed_instruction VARCHAR(255),
    changed_hyper_text VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (template_id) REFERENCES Templates(id),
    FOREIGN KEY (changed_platform) REFERENCES Tech_Stack_Options(platform_name),
    FOREIGN KEY (changed_link) REFERENCES Tech_Stack_Options(platform_link),
    FOREIGN KEY (changed_instruction) REFERENCES Tech_Stack_Options(platform_instruction),
    FOREIGN KEY (changed_hyper_text) REFERENCES Tech_Stack_Options(hyper_text)
);

-- Create indexes on the columns you will reference
CREATE INDEX idx_platform_link ON Tech_Stack_Options(platform_link(255));
CREATE INDEX idx_platform_instruction ON Tech_Stack_Options(platform_instruction(255));
CREATE INDEX idx_hyper_text ON Tech_Stack_Options(hyper_text(255));