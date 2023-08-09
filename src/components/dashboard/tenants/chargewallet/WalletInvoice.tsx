import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ReactComponent as Logo } from "@/assets/icons/tenxLogo.svg";
import { rows } from "@/utils/constant";

const WalletInvoice = () => {
  return (
    <Container className="invoice_charge_wallet">
      <div className="header">
        <div className="left">
          <Logo />
          <span className="location">
            4945 Forest Avenue, New York, 10004, United States
          </span>
          <span className="day">27 March, 2020</span>
        </div>
        <div className="right">
          <span>Invoice</span>
          <span>Billed to,</span>
          <span>Terry Baptista</span>
          <span>3455 Geraldine Lane, New York 10013 United States</span>
        </div>
      </div>
      <div className="tabe">
        <span className="sub">Subject</span>
        <span className="resp">Responsive web design</span>
        <div className="table_with_numbers">
          <div className="invoice_num">
            <div className="item">
              <span>Invoice number</span>
              <span>#00261</span>
            </div>
            <div className="item">
              <span>Invoice number</span>
              <span>#00261</span>
            </div>
            <div className="item">
              <span>Invoice number</span>
              <span>#00261</span>
            </div>
          </div>
          <div className="invoice_table">
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>QTY</TableCell>
                    <TableCell align="left">ITEM DESCRIPTION</TableCell>
                    <TableCell align="right">RATE</TableCell>
                    <TableCell align="right">AMOUNT</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, id) => (
                    <TableRow
                      key={id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.qty}
                      </TableCell>
                      <TableCell align="left">{row.desc}</TableCell>
                      <TableCell align="right">{row.rate}</TableCell>
                      <TableCell align="right">{row.amont}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div>
                <div className="sub_total_invoice">
                  <div className="first">
                    <span>Sub Total</span>
                    <span>GST(10%)</span>
                  </div>
                  <div className="amount">
                    <span>$ 4,500.00</span>
                    <span>$450.00</span>
                  </div>
                </div>
                <div className="total">
                  <div className="usd">
                    <span>Total </span>
                    <span>(USD)</span>
                  </div>
                  <span>$ 4,950.00</span>
                </div>
              </div>
            </TableContainer>
            <div>
              <span className="terms">Terms & Conditions</span>
              <span className="desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec id
                turpis malesuada nibh.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="payment_details">
        <div className="first">
          <span>Payment Details</span>
          <div className="text">
            <span>Paypal:</span> example@email.com
          </div>
          <div className="text">
            <span>UPI:</span> userid@okbank
          </div>
        </div>
        <div className="last">
          <span>www.abcdefg.com</span>
          <span>email@email.com</span>
          <span>email@email.com</span>
        </div>
      </div>
    </Container>
  );
};

export default WalletInvoice;
