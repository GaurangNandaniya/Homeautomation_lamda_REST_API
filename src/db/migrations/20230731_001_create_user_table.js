/*
Up Migration (Up Action): The "up" migration represents the action of applying changes to the database schema. It's 
typically used to create tables, add columns, indexes, constraints, and other modifications to the database structure. 
The "up" migration is executed when you want to move your schema forward, making it more complex or adding new 
features.

Down Migration (Down Action): The "down" migration represents the action of undoing the changes made by the "up" 
migration. It's used to revert the changes applied to the database schema. The "down" migration often includes 
statements to remove tables, columns, or other schema elements that were added in the "up" migration. This allows 
you to roll back to a previous state of the schema.
*/

/*

If you run the `npx knex migration:latest` command again after already running it once, it will not cause 
any changes to your database schema. Knex keeps track of the migrations that have already been run in a 
special table called `knex_migrations`. 

When you run `knex migration:latest`, Knex checks this table to see which migrations have already been applied 
to the database. It then compares the list of available migrations in your migration directory with the ones 
that have been applied. If there are any new migrations that haven't been applied yet, it will execute them 
in order.

If you run `knex migration:latest` again without any new migrations added to your migration directory, Knex 
will simply check the migrations table, see that everything is up to date, and won't make any changes to your 
database schema. It's a way to ensure that your database schema is in sync with your migration scripts.
 */
exports.up = function (knex) {
  return knex.schema.createTable("user", function (table) {
    table.increments("user_id").primary();
    table.string("first_name");
    table.string("last_name");
    table.string("email").unique();
    table.string("password");
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.boolean("is_deleted").defaultTo(false);
    table.timestamp("deleted_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user");
};
