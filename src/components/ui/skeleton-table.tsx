import React from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import { Skeleton } from './skeleton';
import { cn } from '../../lib/utils';

type SkeletonTableProps = React.HTMLAttributes<HTMLDivElement>;

export default function SkeletonTable({ className }: SkeletonTableProps) {
  const headers = Array.from({ length: 4 }, (_, i) => ({ id: i }));
  const cells = Array.from({ length: 4 }, (_, i) => ({ id: i }));
  const rows = Array.from({ length: 5 }, (_, i) => ({ id: i, cells }));

  return (
    <div className={cn('rounded-md border', className)}>
      <Table>
        <TableHeader>
          <TableRow key={1}>
            {headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  <Skeleton className="w-[100px] h-4" />
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {row.cells.map((cell) => (
                <TableCell key={cell.id}>
                  <Skeleton className="w-[150px] h-4" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
