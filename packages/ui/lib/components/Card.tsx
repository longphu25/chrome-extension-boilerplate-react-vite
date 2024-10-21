import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../utils';

export type CardProps = {
  theme?: 'light' | 'dark';
  title: string;
  description: string;
  imageUrl: string;
} & ComponentPropsWithoutRef<'div'>;

export function Card({ theme, className, children, title, description, imageUrl, ...props }: CardProps) {
  return (
    <div
      className={cn(
        className,
        'rounded shadow hover:scale-105',
        theme === 'light' ? 'bg-white' : 'bg-black text-white',
      )}
      {...props}>
      <div className="mb-4">
        <h2 className="text-gray-600 text-sm">Algorand Testnet</h2>
        <h1 className="text-xl font-bold">Algorand Pin Box</h1>
      </div>
      <div className="mb-4">
        <img className="w-48 h-48 object-cover mx-auto" src={imageUrl} alt="Cover" />
        <h2 className="text-lg font-semibold mt-2">{title}</h2>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      {children}
    </div>
  );
}
