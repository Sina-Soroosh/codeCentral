import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

type RequiredProps = {
  columns: { id: number; label: string }[];
  children: React.ReactNode;
};

type PropsWithPagination = {
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  rowsLength: number;
  setRowsPerPage: (page: number) => void;
  isPagination: true;
};

type PropsWithoutPagination = {
  page?: never;
  setPage?: never;
  rowsPerPage?: never;
  rowsLength?: never;
  setRowsPerPage?: never;
  isPagination: false;
};

type TableDetailsProps = (PropsWithPagination | PropsWithoutPagination) &
  RequiredProps;

function TableDetails({
  columns,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  rowsLength,
  children,
  isPagination,
}: TableDetailsProps) {
  const handleChangePage = (newPage: number) => {
    if (isPagination) {
      setPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (isPagination) {
      setRowsPerPage(+event.target.value);
      setPage(0);
    }
  };

  return (
    <Paper sx={{ width: "100%" }} style={{ marginTop: "20px" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  style={{ fontSize: "15px" }}
                  key={column.id}
                  align="right"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
      {isPagination ? (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rowsLength}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, page) => handleChangePage(page)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : null}
    </Paper>
  );
}

export default TableDetails;
