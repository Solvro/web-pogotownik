"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { reportEventType } from "@/config/constants";
import { useMap } from "@/hooks/use-map";
import { addReport } from "@/lib/services/reports";
import { reportSchema } from "@/schemas";
import type { ReportFormValues } from "@/types/forms";

import { CoordsPicker } from "./coords-picker";

export function ReportDialog({ trigger }: { trigger: ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mapPickerOpen, setMapPickerOpen] = useState(false);

  const { refetch, center, zoom } = useMap();

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reportEventType: "drone",
      description: "",
      lat: Number.NaN,
      lng: Number.NaN,
    },
  });

  async function handleSubmit(data: ReportFormValues) {
    const result = await addReport(data);
    await refetch();
    return result;
  }

  function onSubmit(data: ReportFormValues) {
    toast.promise(handleSubmit(data), {
      loading: "Zapisywanie zgłoszenia...",
      success: "Zgłoszenie zapisane.",
      error: "Błąd podczas zapisywania zgłoszenia.",
    });
    setDialogOpen(false);
  }

  function handleMapSelect(lat: number, lng: number) {
    form.setValue("lat", lat);
    form.setValue("lng", lng);
  }

  const lat = form.watch("lat");
  const lng = form.watch("lng");
  const awaitingInput = Number.isNaN(lat) || Number.isNaN(lng);

  const { lat: initialLat, lng: initialLng } = awaitingInput
    ? center
    : { lat, lng };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dodaj zgłoszenie</DialogTitle>
            <DialogDescription>
              Tutaj możesz zgłosić pożar, powódź lub inne zdarzenie wymagające
              interwencji służb ratunkowych.
            </DialogDescription>
          </DialogHeader>
          <form
            id="form-main"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FieldGroup>
              <Controller
                name="reportEventType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="vertical"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <FieldLabel htmlFor="form-select">
                        Rodzaj wydarzenia
                      </FieldLabel>
                      {fieldState.invalid ? (
                        <FieldError errors={[fieldState.error]} />
                      ) : null}
                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="form-select"
                        aria-invalid={fieldState.invalid}
                        className="min-w-[120px]"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        {reportEventType.map((event) => (
                          <SelectItem key={event.value} value={event.value}>
                            {event.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-description">Opis</FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="form-description"
                        placeholder="Krótki opis tego co zobaczyłeś"
                        rows={6}
                        className="min-h-24 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.value.length}/500 znaków
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Field orientation="vertical">
                <FieldLabel>Lokalizacja</FieldLabel>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setMapPickerOpen(true);
                  }}
                  className="w-full justify-start"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  {awaitingInput
                    ? "Wybierz na mapie"
                    : `${lat.toFixed(6)}, ${lng.toFixed(6)}`}
                </Button>
              </Field>
            </FieldGroup>
          </form>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              Anuluj
            </Button>
            <Button
              type="submit"
              form="form-main"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Zapisywanie..." : "Zapisz"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CoordsPicker
        open={mapPickerOpen}
        onOpenChange={setMapPickerOpen}
        onSelect={handleMapSelect}
        initialLat={initialLat}
        initialLng={initialLng}
        initialZoom={zoom}
      />
    </>
  );
}
