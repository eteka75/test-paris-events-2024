import { CalendarIcon, RotateCcw, SlidersHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { fr } from "date-fns/locale";
import { useFilterContext } from "@/context/FilterContext";

interface Filters {
  query?: string;
  sort: string;
  price: string;
  audience: string;
  startDate: Date | null;
  endDate: Date | null;
  locale: string;
}

interface SearchFiltersProps {
  onFilters: (filters: Filters) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilters }) => {
  const { filters, dispatch } = useFilterContext();

  const handleSortChange = (value: string) =>
    dispatch({ type: "SET_SORT", payload: value });
  const handlePriceChange = (value: string) =>
    dispatch({ type: "SET_PRICE", payload: value });
  const handleAudienceChange = (value: string) =>
    dispatch({ type: "SET_AUDIENCE", payload: value });
  const handleLocaleChange = (value: string) =>
    dispatch({ type: "SET_LOCALE", payload: value });
  const handleStartDateChange = (date: Date | undefined) =>
    dispatch({ type: "SET_START_DATE", payload: date || null });
  const handleEndDateChange = (date?: Date) => {
    if (date) {
      dispatch({ type: "SET_END_DATE", payload: date });
    } else {
      dispatch({ type: "CLEAR_END_DATE" });
    }
  };

  const resetFilters = () => dispatch({ type: "RESET_FILTERS" });

  const applyFilters = () => {
    onFilters(filters);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Filtrer la recherche"
          title="Filtrer la recherche"
          type="button"
          className="h-12 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-600"
        >
          <SlidersHorizontal className="h-8 w-8" />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Filtrer les événements</SheetTitle>
          <SheetDescription>
            Choisissez vos options de filtrage pour affiner les résultats de
            recherche.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sort" className="text-right">
              Trier par
            </Label>
            <div className="col-span-3">
              <Select value={filters.sort} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full">
                  <SelectValue
                    id="sort"
                    className="w-full"
                    placeholder="Trier par..."
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Trier par...</SelectLabel>
                    <SelectItem value="date_desc">Plus récents</SelectItem>
                    <SelectItem value="date_asc">Plus anciens</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Type
            </Label>
            <div className="col-span-3">
              <Select value={filters.price} onValueChange={handlePriceChange}>
                <SelectTrigger className="w-full">
                  <SelectValue id="price" placeholder="Sélection de langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value="all">Tout</SelectItem>
                    <SelectItem value="payant">Payant</SelectItem>
                    <SelectItem value="gratuit">Gratuit</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="locale" className="text-right">
              Langue
            </Label>
            <div className="col-span-3 ">
              <Select value={filters.locale} onValueChange={handleLocaleChange}>
                <SelectTrigger className="w-full">
                  <SelectValue id="locale" placeholder="Sélection de langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Langue</SelectLabel>
                    <SelectItem value="fr">Francais</SelectItem>
                    <SelectItem value="en">Anglais</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="audience" className="text-right">
              Audience
            </Label>
            <div className="col-span-3">
              <Select
                value={filters.audience || ""} // Utilisez une chaîne vide comme valeur par défaut
                onValueChange={handleAudienceChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    id="audience"
                    placeholder="Sélection d'audience" // Placeholder lorsque la valeur est vide
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Audience...</SelectLabel>
                    <SelectItem value="Tout">Tout</SelectItem>
                    <SelectItem value="public_public">Tout public</SelectItem>
                    <SelectItem value="public_adultes">Adultes</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              Début le
            </Label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="startDate"
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !filters.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {filters.startDate ? (
                      format(filters.startDate, "PPP", { locale: fr })
                    ) : (
                      <span>Choisir une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.startDate ?? undefined}
                    onSelect={handleStartDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              Prend fin le
            </Label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="endDate"
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !filters.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {filters.endDate ? (
                      format(filters.endDate, "PPP", { locale: fr })
                    ) : (
                      <span>Choisir une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.endDate ?? undefined}
                    onSelect={handleEndDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <SheetFooter className="grid mt-4 pt-4 border-t md:flex gap-2 ">
          <Button
            onClick={resetFilters}
            className="w-full"
            variant={"outline"}
            title="Réinitialiser"
            aria-label="Réinitialiser"
          >
            <RotateCcw />
            <span className="">Réinitialiser</span>
          </Button>
          <SheetClose asChild>
            <Button type="button">Fermer</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SearchFilters;
