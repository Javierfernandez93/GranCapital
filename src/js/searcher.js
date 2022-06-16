load(()=>{
  if($(".table-search").length > 0)
  {
    let content = new Content;

    $(".table-search").each((k,_table) => {
      let table = new Table;

      table.setId($(_table).data("table_name"));

      $(_table).find("tbody tr").each((_k,tr)=>{
        const row_id = getUniqueId();

        let row = new Row;
        let td = $(tr).attr("data-row_id",row_id);

        row.setId(row_id);
        
        $(tr).find("td[data-field]").each((__k,td)=>{
          let field = new Field;

          field.setValue($(td).text().trim());

          const type = $(td).data("type") != undefined ? $(td).data("type") : FieldTypes.TEXT;

          field.setType(type)
          row.addField(field);
        });

        table.addRow(row);
      });

      content.addTable(table);
    });

    window.search = function(element,list_name)
    {
      content.getTables().forEach((table,k)=>{
        if(table.getId() == list_name)
        {
          let value = $(element).val();
        
          var rows = table.getRows().filter( (row) => {
            $("[data-row_id='"+row.getId()+"']").addClass("d-none");

            var fields = row.getFields().filter( (field) => {
              return field.value.toLowerCase().includes(value.toLowerCase());
            }).map((field) => {
              return field.value;
            });

            return fields.length > 0;
          });

          rows.forEach((row,k)=>{
            $("[data-row_id='"+row.getId()+"']").removeClass("d-none");
          })
        }
      })
    }
  }
});

class FieldTypes {
  static TEXT = 1;
  static INTEGER = 1;
}

class Field {
  constructor()
  {
    this.type = null;
    this.value = null;
  }
  setType(type)
  {
    this.type = type;
  }
  getType()
  {
    return this.type
  }
  setValue(value)
  {
    this.value = value;
  }
  getValue()
  {
    return this.value
  }
}

class Row {
  constructor()
  {
    this.id = null;
    this.fields = [];
  }
  setId(id)
  {
    this.id = id;
  }
  getId()
  {
    return this.id;
  }
  addField(field)
  {
    this.fields.push(field)
  }
  setFields(fields)
  {
    this.fields = fields;
  }
  getFields()
  {
    return this.fields
  }
}

class Table {
  constructor()
  {
    this.id = null;
    this.rows = [];
  }
  setId(id)
  {
    this.id = id;
  }
  getId()
  {
    return this.id
  }
  addRow(row)
  {
    this.rows.push(row)
  }
  setRows(rows)
  {
    this.rows = rows;
  }
  getRows()
  {
    return this.rows
  }
}

class Content {
  constructor()
  {
    this.tables = [];
  }
  addTable(table)
  {
    this.tables.push(table);
  }
  setTables(tables)
  {
    this.tables = tables;
  }
  getTables()
  {
    return this.tables;
  }
}