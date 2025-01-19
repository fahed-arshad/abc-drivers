'use client';

import dayjs from 'dayjs';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { ColumnDef } from '@tanstack/react-table';

export type PayoutRow = {
  id: string;
  totalAmount: number;
  platformFee: number;
  proof?: string;
  status: string;
  releasedAt?: string;
  updatedAt: string;
  createdAt: string;
};

export const columns: ColumnDef<PayoutRow>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <p>Request ID</p>,
    cell: ({ row }) => {
      return <p>{row.original.id}</p>;
    }
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <p>Amount</p>,
    cell: ({ row }) => {
      const driverReceivedAmount = (row.original.totalAmount - row.original.platformFee).toFixed(2);
      return <p>OMR {driverReceivedAmount}</p>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <p>Status</p>,
    cell: ({ row }) => {
      const mappedStatus = row.original.status === 'PENDING' ? 'Pending' : 'Paid';
      const bgColor = row.original.status === 'PENDING' ? 'bg-yellow-200' : 'bg-green-200';
      return (
        <Badge variant="outline" className={bgColor}>
          {mappedStatus}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'proof',
    header: ({ column }) => <p>Receipt</p>,
    cell: ({ row }) => {
      return (
        <Button
          size="sm"
          variant="outline"
          disabled={!row.original.proof}
          onClick={() => {
            window.open(row.original.proof, '_blank');
          }}
          className="text-xs"
        >
          Download Receipt
        </Button>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'releasedAt',
    header: ({ column }) => <p>Released At</p>,
    cell: ({ row }) => {
      if (!row.original.releasedAt) return <p>-</p>;
      return <p>{dayjs(row.original.releasedAt).format('DD/MM/YYYY')}</p>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <p>Created At</p>,
    cell: ({ row }) => {
      return <p>{dayjs(row.original.createdAt).format('DD/MM/YYYY')}</p>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  }
];
