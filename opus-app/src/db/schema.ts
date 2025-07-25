import { channel } from "diagnostics_channel";
import { relations } from "drizzle-orm";
import { boolean, integer, interval, numeric, pgEnum, pgTable, text, time, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { sendError } from "next/dist/server/api-utils";
import { spec } from "node:test/reporters";
import { id } from "zod/v4/locales";




export const usersTable = pgTable("users", {
  id: text('id').primaryKey(),
                    name: text('name').notNull(),
 email: text('email').notNull().unique(),
 emailVerified: boolean('email_verified').notNull(),
 image: text('image'),
 slug: text('slug').unique(),
 createdAt: timestamp('created_at').notNull(),
 updatedAt: timestamp('updated_at').notNull()
});



export const authSessionsTable = pgTable("sessions", {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),        
    token: text('token').notNull().unique(),
    createdAt : timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id').notNull().references(()=> usersTable.id, { onDelete: 'cascade' })
});



export const accountsTable= pgTable("accounts", {
                    id: text('id').primaryKey(),
                    accountId: text('account_id').notNull(),
 providerId: text('provider_id').notNull(),
 userId: text('user_id').notNull().references(()=> usersTable.id, { onDelete: 'cascade' }),
 accessToken: text('access_token'),
 refreshToken: text('refresh_token'),
 idToken: text('id_token'),
 accessTokenExpiresAt: timestamp('access_token_expires_at'),
 refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
 scope: text('scope'),
 password: text('password'),
 createdAt: timestamp('created_at').notNull(),
 updatedAt: timestamp('updated_at').notNull()
                });

export const verificationsTable = pgTable("verifications", {
                    id: text('id').primaryKey(),
                    identifier: text('identifier').notNull(),
 value: text('value').notNull(),
 expiresAt: timestamp('expires_at').notNull(),
 createdAt: timestamp('created_at'),
 updatedAt: timestamp('updated_at')
                });



export const instancesTable = pgTable("instances", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    name_id: text('name_id').notNull().unique(),
    number: text('number'),
    token: text('token').notNull(),
    status: text('status').notNull().default('open'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    userId: text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }), 
    updateAt: timestamp('update_at').notNull().defaultNow(),
    companyId: uuid('company_id').references(() => companysTable.id, { onDelete: 'cascade' }),
});

export const servicesTable = pgTable("services", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    status: text('status').notNull().default('enabled'),
    userId: text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updateAt: timestamp('update_at').notNull().defaultNow(),
    duration: integer('duration').notNull().default(30), // Duration in minutes
    price: integer('price').notNull().default(0),
    ai_list: boolean('ai_list').notNull().default(true), // List of AI models
    companyId: uuid('company_id').references(() => companysTable.id, { onDelete: 'cascade' }),
});

// Tabela de vínculo entre serviços e profissionais (users)
export const serviceProfessionalsTable = pgTable("service_professionals", {
    id: uuid('id').primaryKey().defaultRandom(),
    serviceId: uuid('service_id').notNull().references(() => servicesTable.id, { onDelete: 'cascade' }),
    userId :  text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    companyId: uuid('company_id').references(() => companysTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const agentTable = pgTable("agents", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    about : text('about').notNull(),
    tom: text('tom').notNull().default('Profissional e Calmo'),
    status: text('status').notNull().default('disabled'),
    userId: text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    type: text('type').notNull().default('Suporte'),
    instanceId: uuid('instance_id').references(() => instancesTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updateAt: timestamp('update_at').notNull().defaultNow(),
    totalMsg: integer('total_msg').notNull().default(0),
    schedule_mode: text('schedule_mode').notNull().default('link'),
    question_alvo: text('question_alvo').notNull().default(''),
    qualification_role: text('qualification_role').notNull().default(''),
    companyId: uuid('company_id').references(() => companysTable.id, { onDelete: 'cascade' }),
});

export const companysTable = pgTable("companies", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    logoImageUrl: text('logo_image').notNull(),
    userId: text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updateAt: timestamp('update_at').notNull().defaultNow(),
    address: text('address').notNull(),
    phone: text('phone').notNull(),
    website: text('website'),
    linkedin: text('linkedin'),
    instagram: text('instagram'), // JSON or text field for social media links
    industry: text('industry').notNull(), // Industry type
});

export const customersTable = pgTable("customers", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: text('email'),
    phone: text('phone').notNull(),
    status_ai : text('status_ai').notNull().default('disable'),
    avatarImageUrl: text('avatar_image'),
    userId: text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    resume_ai: text('resume_ai'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updateAt: timestamp('update_at').notNull().defaultNow(),
    companyId: uuid('company_id').references(() => companysTable.id, { onDelete: 'cascade' }),

});

export const eventsTable = pgTable("events", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    startTime: timestamp('start_time').notNull(),
    endTime: timestamp('end_time').notNull(),
    status: text('status').notNull().default('upcoming'),
    agentId: uuid('agent_id').notNull().references(() => agentTable.id, { onDelete: 'cascade' }),
    customerId: uuid('customer_id').notNull().references(() => customersTable.id, { onDelete: 'cascade' }),
    userId: text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    companyId: uuid('company_id').references(() => companysTable.id, { onDelete: 'cascade' }),
});

export const scheduleRolesTable = pgTable("schedule_roles", {
    id: uuid('id').primaryKey().defaultRandom(),
    start_working_time: time('start_working_time').notNull(),
    end_working_time: time('end_working_time').notNull(),
    days_worked: text('days_worked').notNull(), // Comma-separated values for days worked
    slot_duration: integer('slot_duration').notNull(), // Duration in minutes
    slots_interval: interval('interval').notNull(), // Interval between slots
    userID: text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    companyId: uuid('company_id').references(() => companysTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),

});

export const faqTable = pgTable("faqs", {
    id: uuid('id').primaryKey().defaultRandom(),
    question: text('question').notNull(),
    answer: text('answer').notNull(),
    userId: text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    companyId: uuid('company_id').references(() => companysTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const sessionsTable = pgTable("agent_sessions", {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    instanceId: uuid('instance_id').notNull().references(() => instancesTable.id, { onDelete: 'cascade' }),
    customerId: uuid('customer_id').notNull().references(() => customersTable.id, { onDelete: 'cascade' }),
    companyId: uuid('company_id').references(() => companysTable.id, { onDelete: 'cascade' }),
    agentId: uuid('agent_id').notNull().references(() => agentTable.id, { onDelete: 'cascade' }),
    cost : numeric('cost', { precision: 10, scale: 2 }),
    channel: text('channel').notNull().default('wpp'),
    analyse_sentimental: text('analyse_sentimental'),
    score: integer('score').notNull().default(0),
    reason_interaction: text('reason_interaction'),
    feedback: text('feedback'),
    status: text('status').notNull().default('active'),
    startTime: timestamp('start_time').notNull().defaultNow(),
    endTime: timestamp('end_time').notNull().defaultNow(),
    etapa: text('etapa').notNull()
});

export const agentMessagesTable = pgTable("agent_messages", {
    id: uuid('id').primaryKey().defaultRandom(),
    sessionId: uuid('session_id').notNull().references(() => sessionsTable.id, { onDelete: 'cascade' }),
    agentId: uuid('agent_id').notNull().references(() => agentTable.id, { onDelete: 'cascade' }),
    userId: text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    content: text('content'),
    sender: text('sender').notNull(),
    companyId: uuid('company_id').references(() => companysTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});


// RELATIONS 
export const userTableRelations =  relations(usersTable, ({ many , one}) => ({
    agents: many(agentTable),
    customers: many(customersTable),
    events: many(eventsTable),
    scheduleRoles: one(scheduleRolesTable),
    sessions: many(sessionsTable),
    faq: many(faqTable),
    instances: many(instancesTable),
    companies: many(companysTable),
}));

export const companyTableRelations = relations(companysTable, ({ one,many }) => ({
    user: one(usersTable, { 
        fields: [companysTable.userId],
        references: [usersTable.id],
    }),
    agents: many(agentTable),
    customers: many(customersTable),
    services: many(servicesTable),
    instances: many(instancesTable),
    sessions: many(sessionsTable),
    events: many(eventsTable),
    faq: many(faqTable),
    scheduleRoles: many(scheduleRolesTable),
    agentMessages: many(agentMessagesTable),
    serviceProfessionals: many(serviceProfessionalsTable),

}));

export const servicesTableRelations = relations(servicesTable, ({ one, many }) => ({
    user: one(usersTable, {
        fields: [servicesTable.userId],
        references: [usersTable.id],
    }),
    professionals: many(serviceProfessionalsTable),
    company: one(companysTable, {
        fields: [servicesTable.companyId],
        references: [companysTable.id],
    }),
}));

export const serviceProfessionalsTableRelations = relations(serviceProfessionalsTable, ({ one }) => ({
    service: one(servicesTable, {
        fields: [serviceProfessionalsTable.serviceId],
        references: [servicesTable.id],
    }),
    user: one(usersTable, {
        fields: [serviceProfessionalsTable.userId],
        references: [usersTable.id],
    }),
    company: one(companysTable, {
        fields: [serviceProfessionalsTable.companyId],
        references: [companysTable.id],
    }),
}));

export const agentTableRelations = relations(agentTable, ({ one, many }) => ({
    user: one(usersTable, {
        fields: [agentTable.userId],
        references: [usersTable.id],
    }),
    sessions: many(sessionsTable),
    instance: one(instancesTable, {
        fields: [agentTable.instanceId],
        references: [instancesTable.id],
    }),
    messages: many(agentMessagesTable),
    company: one(companysTable, {
        fields: [agentTable.companyId],
        references: [companysTable.id],
    }),
}));

export const agentMessagesTableRelations = relations(agentMessagesTable, ({ one }) => ({
    session: one(sessionsTable, {
        fields: [agentMessagesTable.sessionId],
        references: [sessionsTable.id],
    }),
    user: one(usersTable, {
        fields: [agentMessagesTable.userId],
        references: [usersTable.id],
    }),
    company: one(companysTable, {
        fields: [agentMessagesTable.companyId],
        references: [companysTable.id],
    }),
    agent: one(agentTable, {
        fields: [agentMessagesTable.agentId],
        references: [agentTable.id],
    }),

}));

export const customerTableRelations = relations(customersTable, ({ one , many}) => ({
    user: one(usersTable, { 
        fields: [customersTable.userId],
        references: [usersTable.id]
    }),
    sessions: many(sessionsTable),
    company: one(companysTable, {
        fields: [customersTable.companyId],
        references: [companysTable.id],
    })
}));
export const instanceTableRelations = relations(instancesTable, ({ one }) => ({
    user: one(usersTable ,  { 
        fields: [instancesTable.userId],
        references: [usersTable.id],
    }),
    company: one(companysTable, {
        fields: [instancesTable.companyId],
        references: [companysTable.id],
    }),
}));


export const sessionsTableRelations = relations(sessionsTable, ({ one }) => ({
    // Esta relação 'agent' é a que corrige o teu erro específico
    agent: one(agentTable, {
        fields: [sessionsTable.agentId],
        references: [agentTable.id],
    }),

    // É uma boa prática definir também as outras relações da tabela
    user: one(usersTable, {
        fields: [sessionsTable.userId],
        references: [usersTable.id],
    }),

    instance: one(instancesTable, {
        fields: [sessionsTable.instanceId],
        references: [instancesTable.id],
    }),
    
    customer: one(customersTable, {
        fields: [sessionsTable.customerId],
        references: [customersTable.id],
    }),
    company: one(companysTable, {
        fields: [sessionsTable.companyId],
        references: [companysTable.id],
    }),
}));

export const eventsTableRelations = relations(eventsTable, ({ one }) => ({
    // Esta relação 'user' é a que corrige o teu erro específico
    user: one(usersTable, {
        fields: [eventsTable.userId],
        references: [usersTable.id],
    }),

    // Também é importante definir as outras relações da tabela 'events'
    agent: one(agentTable, {
        fields: [eventsTable.agentId],
        references: [agentTable.id],
    }),
    
    customer: one(customersTable, {
        fields: [eventsTable.customerId],
        references: [customersTable.id],
    }),
    company: one(companysTable, {
        fields: [eventsTable.companyId],
        references: [companysTable.id],
    }),
}));

export const scheduleRolesTableRelations = relations(scheduleRolesTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [scheduleRolesTable.userID],
        references: [usersTable.id],
    }),
    company: one(companysTable, {
        fields: [scheduleRolesTable.companyId],
        references: [companysTable.id],
    }),
}));
export const faqTableRelations = relations(faqTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [faqTable.userId],
        references: [usersTable.id],
    }),
    company: one(companysTable, {
        fields: [faqTable.companyId],
        references: [companysTable.id],
    }),
}));