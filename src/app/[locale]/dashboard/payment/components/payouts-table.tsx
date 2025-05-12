'use client';

import dayjs from 'dayjs';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import SkeletonTable from '@/components/ui/skeleton-table';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';

export type Payout = {
  id: string;
  index: number;
  netDriverFee: number;
  status: string;
  proof?: string;
  releasedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Payout>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <p>Payout Index</p>,
    cell: ({ row }) => <p>{row.original.index}</p>
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <p>Amount</p>,
    cell: ({ row }) => {
      const driverReceivedAmount = row.original.netDriverFee.toFixed(2);
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
      const status = row.original.status;
      const mappedStatus = status === 'PENDING' ? 'Pending' : status === 'COMPLETED' ? 'Paid' : 'Failed';
      const bgColor = status === 'PENDING' ? 'bg-yellow-200' : status === 'COMPLETED' ? 'bg-green-200' : 'bg-red-200';

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
            if (row.original.proof) {
              window.open(row.original.proof, '_blank');
            }
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

type PayoutsTableProps = React.HTMLAttributes<HTMLDivElement> & {
  data: Payout[];
  loading?: boolean;
};

export function PayoutsTable({ data, loading, className }: PayoutsTableProps) {
  return <div className={className}>{loading ? <SkeletonTable className="mt-4" /> : <DataTable columns={columns} data={data} searchPlaceholder="Search..." />}</div>;
}
