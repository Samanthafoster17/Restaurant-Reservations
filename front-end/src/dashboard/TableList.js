

export default function TablesList({ table }) {
   
    return (
        <tbody>
            <tr>
            <td>{table.table_id}</td>
                <td>{table.table_name}</td>
                <td>{table.capacity}</td>
                <td data-table-id-status="3">{table.status}</td>
                
            </tr>
        </tbody>
    )
}


