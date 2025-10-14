"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="section bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-secondary p-12 lg:p-16 text-center shadow-xl"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-white/10" />
          
          <div className="relative z-10">
            <h2 className="text-white mb-4">
              Ready to Transform Your Medical Imaging Workflow?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join leading medical institutions worldwide using our software for advanced medical image analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="bg-white hover:bg-white/90 text-primary border-white" asChild>
                <Link href="/contact">
                  <Mail className="h-5 w-5" />
                  Request Demo
                </Link>
              </Button>
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/10" asChild>
                <Link href="/products/radview">
                  Learn More
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

