import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { api } from "@/trpc/server"
import { TableItem } from "./table-item"
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function UsersTable() {
  const session = await getServerAuthSession();
  const data = await api.user.getTableData()

  if (!session?.user.isAdmin) {
    return redirect('/')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock</CardTitle>
        <CardDescription>
          Lipsum dolor sit amet, consectetur adipiscing elit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHeader>
                Email
              </TableHeader>
              <TableHead>Attendance Count</TableHead>
              <TableHead>Username</TableHead>
              <TableHead className="w-[100px]">
                Is Admin
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map((user) => (
                <TableItem key={user.id} user={user} />
              ))

            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
