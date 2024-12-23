import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, ExternalLink } from "lucide-react";
//import { getUserLinks, markLinkClick, deleteLink } from '@/Api/api';

import useAuth from "@/hooks/useAuth";
import { Link } from "@/types";
import { api } from "@/Api/api";
import { useAuthHeaders } from "@/hooks/useAuthHeaders";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function Dashboard() {
  const [urls, setUrls] = useState<Link[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated } = useAuth();
  const authHeader = useAuthHeaders();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchUserUrls = useCallback(
    async (authHeader: object) => {
      try {
        console.log(authHeader);

        const response = await api.getUserLinks(authHeader);
        if (response.success) {
          setUrls(response.data);
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [api]
  );

  const handleClickLink = useCallback(
    async (id: string) => {
      try {
        const response = await api.markLinkClick(id, authHeader);
        window.location.href = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    [api.markLinkClick]
  );

  useEffect(() => {
    if (isAuthenticated) {
      console.log("authenticated");

      fetchUserUrls(authHeader);
    }
  }, [isAuthenticated]);

  const handleDelete = useCallback(
    async (id: string) => {
      if (confirm("Are you sure you want to permanently remove this url 💀")) {
        setUrls(urls.filter((url) => url._id !== id));
        await api.deleteLink(id, authHeader);
      }
    },
    [api.deleteLink]
  );

  const filteredUrls = urls.filter(
    (url) =>
      url.orginalUrl
        ?.toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()) ||
      url.shortUrl?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Shortened URLs</CardTitle>
        <CardDescription>View and manage your shortened URLs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Search URLs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Original URL</TableHead>
              <TableHead>Short URL</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUrls.map((url) => (
              <TableRow key={url._id}>
                <TableCell className="font-medium  max-w-[500px] break-words ">
                  {url.orginalUrl}
                </TableCell>
                <TableCell>
                  <a
                    href={url.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClickLink(url._id);
                    }}
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    {url.shortUrl} <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </TableCell>
                <TableCell>
                  {new Date(url.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </TableCell>
                <TableCell>{url.click}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(url._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredUrls.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No URLs found.</p>
        )}
      </CardContent>
    </Card>
  );
}
