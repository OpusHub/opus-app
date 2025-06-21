import { relations } from "drizzle-orm";
import { integer, interval, pgEnum, pgTable, text, time, timestamp, uuid, varchar } from "drizzle-orm/pg-core";




export const usersTable = pgTable("users", {
  id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    avatarImageUrl: text('avatar_image').notNull(),
});

export const instancesTable = pgTable("instances", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    name_id: text('name_id').notNull().unique(),
    token: text('token').notNull(),
    status: text('status').notNull().default('open'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    userId: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }), 
    updateAt: timestamp('update_at').notNull().defaultNow(),
});

export const agentTable = pgTable("agents", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    about : text('about').notNull(),
    status: text('status').notNull().default('disabled'),
    userId: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    type: text('type').notNull().default('default'),
    instanceId: uuid('instance_id').notNull().references(() => instancesTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updateAt: timestamp('update_at').notNull().defaultNow(),
    totalMsg: integer('total_msg').notNull().default(0),
    question_alvo: text('question_alvo').notNull().default(''),
    qualification_role: text('qualification_role').notNull().default(''),
});


export const customersTable = pgTable("customers", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    phone: text('phone').notNull(),
    avatarImageUrl: text('avatar_image').notNull(),
    userId: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    resume_ai: text('resume_ai').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updateAt: timestamp('update_at').notNull().defaultNow(),

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
    userId: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const scheduleRolesTable = pgTable("schedule_roles", {
    id: uuid('id').primaryKey().defaultRandom(),
    start_working_time: time('start_working_time').notNull(),
    end_working_time: time('end_working_time').notNull(),
    days_worked: text('days_worked').notNull(), // Comma-separated values for days worked
    slot_duration: integer('slot_duration').notNull(), // Duration in minutes
    slots_interval: interval('interval').notNull(), // Interval between slots
    userID: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }), 
});

export const faqTable = pgTable("faqs", {
    id: uuid('id').primaryKey().defaultRandom(),
    question: text('question').notNull(),
    answer: text('answer').notNull(),
    userID: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
});

export const sessionsTable = pgTable("sessions", {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    instanceId: uuid('instance_id').notNull().references(() => instancesTable.id, { onDelete: 'cascade' }),
    customerId: uuid('customer_id').notNull().references(() => customersTable.id, { onDelete: 'cascade' }),
    agentId: uuid('agent_id').notNull().references(() => agentTable.id, { onDelete: 'cascade' }),
    status: text('status').notNull().default('active'),
    startTime: timestamp('start_time').notNull().defaultNow(),
    endTime: timestamp('end_time').notNull().defaultNow(),
    etapa: text('etapa').notNull()
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
}));

export const agentTableRelations = relations(agentTable, ({ one, many }) => ({
    user: one(usersTable, {
        fields: [agentTable.userId],
        references: [usersTable.id],
    }),
    sessions: many(sessionsTable),
}));

export const customerTableRelations = relations(customersTable, ({ one , many}) => ({
    user: one(usersTable, { 
        fields: [customersTable.userId],
        references: [usersTable.id]
    }),
    sessions: many(sessionsTable),
}));
export const instanceTableRelations = relations(instancesTable, ({ one }) => ({
    user: one(usersTable ,  { 
        fields: [instancesTable.userId],
        references: [usersTable.id],
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
}));

export const scheduleRolesTableRelations = relations(scheduleRolesTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [scheduleRolesTable.userID],
        references: [usersTable.id],
    })
}));
export const faqTableRelations = relations(faqTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [faqTable.userID],
        references: [usersTable.id],
    }),
}));