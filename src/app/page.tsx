import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "../../components/ui/Overview";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col justify-center items-center'>
      <div className='text-5xl'>
        <h2 className="mb-10">
          Tiendita de la esquina <span className='text-blue-500'>🛒</span>
        </h2>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
            <Overview />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
