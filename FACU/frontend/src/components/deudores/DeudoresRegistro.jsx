import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function DeudoresRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });

  const onSubmit = (data) => {
    Grabar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo ApellidoYNombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="ApellidoYNombre">
                ApellidoYNombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("ApellidoYNombre", {
                  required: { value: true, message: "El Apellido y el Nombre es requerido" },
                  minLength: {
                    value: 4,
                    message: "ApellidoYNombre debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "ApellidoYNombre debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.ApellidoYNombre ? "is-invalid" : "")
                }
              />
              {errors?.ApellidoYNombre && touchedFields.ApellidoYNombre && (
                <div className="invalid-feedback">
                  {errors?.ApellidoYNombre?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo ImporteAdeudado */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="ImporteAdeudado">
                Importe Adeudado<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number" step=".01"
                {...register("ImporteAdeudado", {
                  required: { value: true, message: "El importe adeudado es requerido" },
                  min: {
                    value: 0.01,
                    message: "El importe adeudado debe ser mayor a 0",
                  },
                  max: {
                    value: 9999999.99,
                    message: "El importe adeudado debe ser menor o igual a 9999999.99",
                  },
                })}
                className={
                  "form-control " + (errors?.ImporteAdeudado ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.ImporteAdeudado?.message}</div>
            </div>
          </div>

          {/* campo FechaDeuda */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaDeuda">
                Fecha de la Deuda<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("FechaDeuda", {
                  required: { value: true, message: "Fecha de la deuda es requerida" }
                })}
                className={
                  "form-control " + (errors?.FechaDeuda ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.FechaDeuda?.message}
              </div>
            </div>
          </div>
        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Registrar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Volver"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}

      </div>
    </form>
  );
}

