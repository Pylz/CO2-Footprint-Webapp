// Warten, bis das Dokument vollständig geladen ist
$(document).ready(function () {
    // Objekt zur Speicherung der Sortierrichtung für jede Tabelle
    const direction = {
        "emissionsTable": "asc",
        "emissionsTable2": "asc"
    };

    // Funktion, um den Wert einer Zelle in einer Zeile zu erhalten
    const getVal = (elm, index) => {
        let v = $(elm).children("td").eq(index).text().toUpperCase();
        return $.isNumeric(v) ? parseInt(v, 10) : v;
    }

    // Funktion, um die Sortierrichtung als Integer zurückzugeben
    const getInt = (a) => a === "asc" ? 1 : -1;

    // Event-Handler für Klicks auf Tabellenköpfe
    $("th").on("click", function () {
        // Bestimmt die ID der Tabelle, die den angeklickten Tabellenkopf enthält
        const table = $(this).parents("table").attr("id");
        // Holt alle Zeilen der Tabelle
        const rows = $(`#${table} tbody  tr:has(td)`).get();
        // Bestimmt den Index der angeklickten Spalte
        const index = $(this).index();

        // Sortiert die Zeilen
        rows.sort((a, b) => {
            let A = getVal(a, index);
            let B = getVal(b, index);

            return A < B
                ? -1 * getInt(direction[table])
                : A > B
                    ? 1 * getInt(direction[table])
                    : 0;
        });

        // Fügt die sortierten Zeilen wieder in die Tabelle ein
        $.each(rows, (index, row) => {
            $(`#${table}`).children("tbody").append(row);
        });

        // Ändert die Sortierrichtung für die nächste Sortierung
        direction[table] = direction[table] === "asc" ? "desc" : "asc";
    });

    // Event-Handler für die Sucheingabefelder
    $("#searchInputCountry, #searchInputCompany").on("keyup", function () {
        // Holt den eingegebenen Suchtext
        const searchText = $(this).val().toUpperCase();
        // Bestimmt die ID der zu durchsuchenden Tabelle
        const tableId = $(this).attr("id") === "searchInputCountry" ? "#emissionsTable" : "#emissionsTable2";

        // Durchsucht die Tabelle und blendet nicht übereinstimmende Zeilen aus
        $(`${tableId} tr:has(td)`).each(function () {
            const lineStr = $(this).text().toUpperCase();
            $(this).toggle(lineStr.indexOf(searchText) !== -1);
        });
    });
});