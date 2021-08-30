import React from 'react'
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from '@david.kucsai/react-pdf-table'

const Invoice = ({ order }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ {new Date().toLocaleString()} ~
      </Text>
      <Text style={styles.title}>Order Invoice</Text>
      <Text style={styles.author}>React Redux Ecommerce - FoodStore</Text>
      <Text style={styles.subtitle}>Order Summary</Text>

      <Table>
        <TableHeader>
          <TableCell>Title</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Sub Total</TableCell>
        </TableHeader>
      </Table>

      <Table data={order.products}>
        <TableBody>
          <DataTableCell getContent={(x) => x.product.title} />
          <DataTableCell getContent={(x) => `$${x.price}`} />
          <DataTableCell getContent={(x) => x.quantity} />
          <DataTableCell getContent={(x) => `$${x.price * x.quantity}`} />
        </TableBody>
      </Table>

      <Text style={styles.text}>
        <Text>
          Date: {'                                               '}
          {new Date(order.createdAt).toLocaleString()}
        </Text>
        {'\n'}
        <Text>
          Order Id: {'                                         '}
          {order._id}
        </Text>
        {'\n'}
        <Text>
          Order Status: {'                                  '}
          {order.orderStatus}
        </Text>
        {'\n'}
        <Text>
          Payment Method: {'                           '}
          {order.paymentMethod}
        </Text>
        {'\n'}
        <Text>
          Payment Status: {'                             '}
          {order.paymentIntent?.status}
        </Text>
        {'\n'}
        <Text>
          Discount Applied: {'                           '}
          {order.couponApplied ? 'Yes' : 'No'}
        </Text>
        {'\n'}
        {order.couponApplied ? (
          <Text>
            Total Paid On Discount: {'                  '}$
            {order.paymentIntent && order.paymentIntent.amount / 100}
          </Text>
        ) : (
          <Text>
            Total Paid: {'                                      '}$
            {order.paymentIntent && order.paymentIntent.amount / 100}
          </Text>
        )}
      </Text>

      <Text style={styles.footer}> ~ Thank you for shopping with us ~ </Text>
    </Page>
  </Document>
)

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 8,
    marginRight: 12,
    marginLeft: 12,
    marginBottom: 0,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  footer: {
    padding: '100px',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
})

export default Invoice
