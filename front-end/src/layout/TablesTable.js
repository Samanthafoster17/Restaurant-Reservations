import React from "react"

export default function TablesTable({ tablesList }) {

    return (
        <div className="table-responsive">
            <table className="table no-wrap">
                <thead>
                    <tr>
                        <th className="border-top-0">#</th>
                        <th className="border-top-0">TABLE NAME</th>
                        <th className="border-top-0">CAPACITY</th>
                        <th className="border-top-0">Free?</th>
                    </tr></thead>
                {tablesList()}
            </table>
        </div>
    )
}