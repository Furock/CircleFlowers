function setAttributes(domElement, attributes) {
    for (let attr of attributes) {
        try {
            domElement.setAttribute(attr.name, attr.value);
        } catch (error) {
            console.error("Setting attribute \"" + attr.name + "\" with value \"" + attr.value + " not possible. Error:");
            console.error(error);
        }
    }
}

function getDomRow(row) {
    let domRow = document.createElement("tr");
    setAttributes(domRow, row.attributes);

    for (let entry of row.entries) {
        let domEntry = document.createElement(entry.isHeader? "th" : "td");
        setAttributes(domEntry, entry.attributes);
        domEntry.innerHTML = entry.content;

        if (entry.isHeader != row.entries[0].isHeader) {
            console.warn("Header property of the following entry is not equal to the first entry (isHeader=" + row.entries[0].isHeader + "):");
            console.warn(entry);
        }

        domRow.appendChild(domEntry);
    }

    return domRow;
}

function attr(attrName, attrValue) {
    return {name: attrName, value: attrValue};
}

function row(rowAttributes, rowEntries) {
    return {attributes: rowAttributes, entries:rowEntries};
}

function entry(is_header, entryAttributes, entryContent) {
    return {isHeader:is_header, content:entryContent, attributes:entryAttributes};
}

function createTable(attributes, ...rows) {
    let table = document.createElement("table");
    setAttributes(table, attributes)


    for (let row of rows) {
        let domRow = getDomRow(row);
        table.appendChild(domRow);

        if (row.entries.length != rows[0].entries.length) {
            console.warn("Table has " + rows[0].length + " columns. The following row doesn't:");
            console.warn(row);
        }
    }

    return table;
}