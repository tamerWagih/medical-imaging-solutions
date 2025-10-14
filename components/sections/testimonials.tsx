"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section className="section bg-surface-muted">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            Trusted by Medical Professionals
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto"
          >
            See what healthcare professionals say about our software
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <Quote className="h-10 w-10 text-primary/20 mb-4" />
                  <p className="text-text-secondary mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-text-primary">{testimonial.author}</p>
                    <p className="text-sm text-text-secondary">{testimonial.role}</p>
                    <p className="text-sm text-text-tertiary">{testimonial.institution}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

