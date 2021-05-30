const mysql = require('mysql');


let connection = mysql.createConnection({
    host: "192.168.1.105",
    user: "root",
    password: "Study_mysql20210131",
    database: "easy_pan_link"
});

connection.connect();
module.exports = {
    fields: '*',
    keywords: '',
    table: 'url_info',
    condition: '1=1',
    set: function (keywords) {
        this.keywords = keywords;
        return this;
    },
    field: function (fields) {
        this.fields = fields;
        return this;
    },
    from: function (table) {
        this.table = table;
        return this;
    },
    value: function (values) {
        this.values = values;
        return this;
    },
    where: function (condition) {
        this.condition = condition;
        return this;
    },
    initAttribute: function () {
        this.fields = '*';
        this.keywords = '';
        this.values = undefined;
        this.condition = '1=1';
        this.table = 'url_info';
    },
    select: function (callback) {
        let sql = `select ${this.fields} from ${this.table} `;
        if (this.condition) {
            sql = `${sql} where ${this.condition}`;
        }
        console.log(sql);
        connection.query(sql, function (error, results) {
            console.log(results);
            if (!error) {
                callback(results);
            }
        })
        this.initAttribute();
    },
    update: function (callback) {
        if (!this.condition) {
            return
        }
        let condition = this.condition;
        let sql = `update ${this.table} set ${this.keywords} where ${condition}`;
        connection.query(sql, function (error, results) {
            if (!error) {
                console.log(results.changedRows);
                callback(condition);
            }
        });
        this.initAttribute();
    },
    delete: function (callback) {
        if (!this.condition) {
            return
        }
        let condition = this.condition;
        let sql = `delete from ${this.table} where ${this.condition}`;
        connection.query(sql, function (error) {
            if (!error) { callback(condition); }
        })
        this.initAttribute();
    },
    insert: function (callback) {
        if (this.fields && this.values) {
            let sql = `insert into ${this.table}(${this.fields}) values(${this.values})`;
            console.log(sql);
            connection.query(sql, function (error, results) {
                if (!error) {
                    console.log(results.changedRows);
                    callback();
                }
            });
            this.initAttribute();
        }
    }
}
