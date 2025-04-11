"use client";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  name: string;
}

interface CommandComboboxProps {
  id: string;
  name: string;
  placeholder: string;
  fetchUrl: string;
  multiple?: boolean;
}

export function CommandCombobox({
  id,
  name,
  placeholder,
  fetchUrl,
  multiple = false,
}: CommandComboboxProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then(setItems);
  }, [fetchUrl]);

  const toggleItem = (item: Item) => {
    if (multiple) {
      setSelectedItems((prev) =>
        prev.find((i) => i.id === item.id)
          ? prev.filter((i) => i.id !== item.id)
          : [...prev, item]
      );
    } else {
      setSelectedItems([item]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedItems.length > 0
              ? selectedItems.map((item) => item.name).join(", ")
              : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
              {items.map((item) => (
                <CommandItem key={item.id} onSelect={() => toggleItem(item)}>
                  {item.name}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Inputs ocultos para envio ao form */}
      {selectedItems.map((item) => (
        <input
          key={item.id}
          type="hidden"
          name={multiple ? `${name}[]` : name}
          value={item.id}
        />
      ))}
    </div>
  );
}
